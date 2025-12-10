'use server'

interface ContactFormState {
    success: boolean;
    message: string;
}

export async function sendToMOndayAction(prevState: ContactFormState | null, formData: FormData): Promise<ContactFormState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const subject = formData.get('subject') as string;

    if (!name || !email || !message || !subject) {
        return { success: false, message: 'Todos os campos são obrigatórios.' };
    }

    const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;
    const MONDAY_BOARD_ID = process.env.MONDAY_BOARD_ID;

    if (!MONDAY_API_TOKEN || !MONDAY_BOARD_ID) {
        console.error('Missing Monday.com API token or Board ID');
        return { success: false, message: 'Erro interno do servidor. Tente novamente mais tarde.' };
    }

    const subjectMap: Record<string, string> = {
        "orcamento": "Orçamento de Projeto",
        "duvida": "Dúvida Técnica",
        "parceria": "Parceria",
        "outro": "Outro"
    };

    const subjectText = subjectMap[subject] || subject;

    const finalMessage = `[Assunto: ${subjectText}]\n\n${message}`;
    
    const columnValues = {
        "email_mky9nth6": { "email": email, "text": email },
        "phone_mky9kd7t": { "phone": phone, "countryShortCode": "BR" },
        "text_mky9dsdp": finalMessage, 
        "color_mky9vxem": { "label": "Em andamento" }
    };

    const query = `mutation ($boardId: ID!, $itemName: String!, $columnVals: JSON!) {
    create_item (board_id: $boardId, item_name: $itemName, column_values: $columnVals) {
      id
      }
    }`;

    try {
        const response = await fetch('https://api.monday.com/v2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': MONDAY_API_TOKEN
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    boardId: Number(MONDAY_BOARD_ID),
                    itemName: name,
                    columnVals: JSON.stringify(columnValues)
                }
            })
        });

        const data = await response.json();

        if (data.errors) {
            console.error('Monday.com API error:', JSON.stringify(data.errors, null, 2));
            return { success: false, message: 'Erro ao enviar a mensagem. Tente novamente mais tarde.' };
        }

        return { success: true, message: 'Mensagem enviada com sucesso!' };
    }   catch (error) {
        console.error('Error sending data to Monday.com:', error);
        return { success: false, message: 'Erro ao enviar a mensagem. Tente novamente mais tarde.' };
    }
}