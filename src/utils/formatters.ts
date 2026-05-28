export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDate(date?: string | null): string {
  if (!date) return "Não informado";

  const [year, month, day] = date.split("T")[0].split("-");

  if (!year || !month || !day) return "Data inválida";

  return `${day}/${month}/${year}`;
}

export function formatDateRange(
  start?: string | null,
  end?: string | null,
): string {
  if (!start && !end) return "Não informado";
  if (start && !end) return formatDate(start);
  if (!start && end) return formatDate(end);

  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function toInputDate(dateString: string): string {
  // Converts "DD/MM/YYYY" or ISO to "YYYY-MM-DD" for input[type=date]
  if (!dateString) return "";
  if (dateString.includes("/")) {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  }
  return dateString.slice(0, 10);
}
