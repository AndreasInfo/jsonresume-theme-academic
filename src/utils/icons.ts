export function profileIcon(network: string | null | undefined): string {
  if (!network) return '<i class="fa-solid fa-link"></i>';
  const n = network.toLowerCase();
  if (n === 'linkedin') return '<i class="fa-brands fa-linkedin-in"></i>';
  if (n === 'github') return '<i class="fa-brands fa-github"></i>';
  if (n === 'twitter' || n === 'x') return '<i class="fa-brands fa-x-twitter"></i>';
  if (n === 'stackoverflow') return '<i class="fa-brands fa-stack-overflow"></i>';
  return '<i class="fa-solid fa-link"></i>';
}
