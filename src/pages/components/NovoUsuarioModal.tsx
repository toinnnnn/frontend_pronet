import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import { useCriarUsuario } from '@/hooks/useUsuarios'
import type { NovoUsuario } from '@/types/usuario'

const schema = z.object({
  nomeCompleto: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  perfil: z.enum(['administrador', 'gerente', 'engenheiro', 'tecnico', 'visitante']),
  funcao: z.string().min(1, 'Função é obrigatória'),
  status: z.enum(['ativo', 'inativo']),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onClose: () => void
}

export default function NovoUsuarioModal({ open, onClose }: Props) {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const criarUsuario = useCriarUsuario()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'ativo' },
  })

  const onSubmit = async (data: FormData) => {
    await criarUsuario.mutateAsync(data as NovoUsuario)
    reset()
    onClose()
  }

  const handleClose = () => { reset(); onClose() }

  return (
    <Modal open={open} onClose={handleClose} title="Novo Usuário">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Nome Completo <span className="text-danger">*</span>
          </label>
          <input {...register('nomeCompleto')} className="input-field" placeholder="Ex: João Silva" />
          {errors.nomeCompleto && <p className="text-danger text-xs mt-1">{errors.nomeCompleto.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            E-mail <span className="text-danger">*</span>
          </label>
          <input type="email" {...register('email')} className="input-field" placeholder="joao@empresa.com" />
          {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Senha <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              {...register('senha')}
              className="input-field pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
            >
              {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.senha && <p className="text-danger text-xs mt-1">{errors.senha.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Tipo de Perfil <span className="text-danger">*</span>
            </label>
            <select {...register('perfil')} className="input-field">
              <option value="">Selecione...</option>
              <option value="administrador">Administrador</option>
              <option value="gerente">Gerente</option>
              <option value="engenheiro">Engenheiro</option>
              <option value="tecnico">Técnico</option>
              <option value="visitante">Visitante</option>
            </select>
            {errors.perfil && <p className="text-danger text-xs mt-1">{errors.perfil.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
            <select {...register('status')} className="input-field">
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Função <span className="text-danger">*</span>
          </label>
          <input {...register('funcao')} className="input-field" placeholder="Ex: Engenheiro Civil, Técnico de Segurança..." />
          {errors.funcao && <p className="text-danger text-xs mt-1">{errors.funcao.message}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={handleClose} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}