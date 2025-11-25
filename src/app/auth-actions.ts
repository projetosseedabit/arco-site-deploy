'use server'

import { cookies } from 'next/headers';

export async function loginAction(formData: FormData) {
  const user = formData.get('username');
  const pass = formData.get('password');

  // CREDENCIAIS DO ADM
  if (user === 'admin' && pass === 'arco123') {
    // Define um cookie que dura 1 dia
    const cookieStore = await cookies();
    cookieStore.set('arco_admin_token', 'autenticado-com-sucesso', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dia
      path: '/',
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
  return cookieStore.has('arco_admin_token');
}