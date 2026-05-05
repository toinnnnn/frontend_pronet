export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatDate(dateString: string): string {
  if (!dateString) return '—'
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

export function formatDateRange(start: string, end: string): string {
  return `${formatDate(start)} – ${formatDate(end)}`
}

export function toInputDate(dateString: string): string {
  // Converts "DD/MM/YYYY" or ISO to "YYYY-MM-DD" for input[type=date]
  if (!dateString) return ''
  if (dateString.includes('/')) {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}`
  }
  return dateString.slice(0, 10)
}
