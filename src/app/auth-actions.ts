'use server'

import { cookies } from 'next/headers';

export async function loginAction(formData: FormData) {
  const user = formData.get('username');
  const pass = formData.get('password');

  const validUser = process.env.ADMIN_USER;
  const validPass = process.env.ADMIN_PASSWORD;
  const cookieSecret = process.env.ADMIN_COOKIE_SECRET;


  if (!validUser || !validPass) {
    console.error("ERRO: Variáveis de ambiente de ADMIN não configuradas.");
    return { success: false, message: 'Erro interno de configuração.' };
  }

  if (user === validUser && pass === validPass) {
    // Define um cookie que dura 1 dia
    if (!cookieSecret) {
      console.error("ERRO: Variável de ambiente ADMIN_COOKIE_SECRET não configurada.");
      return { success: false, message: 'Erro interno de configuração.' };
    }
    const cookieStore = await cookies();
    cookieStore.set('arco_admin_token', cookieSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dia
      path: '/',
      sameSite: 'strict',
    });
    return { success: true };
  }

  return { success: false, message: 'Credenciais inválidas' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('arco_admin_token');
}

export async function isAdminAuthenticated() {
const cookieStore = await cookies();
  const token = cookieStore.get('arco_admin_token');
  const cookieSecret = process.env.ADMIN_COOKIE_SECRET;
  
  if (!token || !cookieSecret) return false;

  return token.value === cookieSecret;
}