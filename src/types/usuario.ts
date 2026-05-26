export type UsuarioPerfil = 'administrador' | 'gerente' | 'engenheiro' | 'tecnico' | 'visitante'
export type UsuarioStatus = 'ativo' | 'inativo'

export interface Usuario {
  id: string
  nomeCompleto: string
  email: string
  perfil: UsuarioPerfil
  funcao: string
  status: UsuarioStatus
  createdAt?: string
}

export interface NovoUsuario {
  nomeCompleto: string
  email: string
  senha: string
  perfil: UsuarioPerfil
  funcao: string
  status: UsuarioStatus
}