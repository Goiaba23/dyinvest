// lib/ia/market-hours.ts - Verificar horário de funcionamento do mercado

export interface MarketHours {
  isOpen: boolean;
  market: string;
  currentTime: string;
  openTime: string;
  closeTime: string;
  nextOpen?: string;
  nextClose?: string;
}

export function isMarketOpen(): MarketHours {
  const now = new Date();
  
  // Usar data local em vez de timezone para evitar erros
  const dayOfWeek = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Converter para minutos desde meia-noite (horário local)
  const currentMinutes = hours * 60 + minutes;
  const openMinutes = 10 * 60; // 10:00
  const closeMinutes = 17 * 60 + 55; // 17:55
  
  // Verificar se é dia útil (0 = domingo, 6 = sábado)
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
  
  // Verificar horário de funcionamento
  const isOpen = isWeekday && currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
  
  // Formatar hora atual
  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  const dayNames = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const dayName = dayNames[dayOfWeek];
  
  return {
    isOpen,
    market: 'B3 - Bolsa de Valores Brasileira',
    currentTime: `${timeStr} (Brasília)`,
    openTime: '10:00 (Brasília)',
    closeTime: '17:55 (Brasília)',
    nextOpen: isOpen ? undefined : `Próxima abertura: ${dayNames[(dayOfWeek + 1) % 7]} às 10:00`,
  };
}

export function shouldSyncStocks(): boolean {
  const { isOpen } = isMarketOpen();
  return isOpen;
}

export function shouldGetNews(): boolean {
  // News pode ser buscado a qualquer hora, mas prioriza horário comercial
  const now = new Date();
  const hours = now.getHours();
  return hours >= 6 && hours <= 22; // 6h às 22h
}

export function canRunAI(): boolean {
  // AI pode rodar a qualquer momento
  return true;
}