export const filterYurtlar = (yurtlar, filters) => {
  let filtered = [...yurtlar];
  
  if (filters.sehir) {
    filtered = filtered.filter(yurt => yurt.sehir === filters.sehir);
  }
  
  if (filters.cinsiyet) {
    filtered = filtered.filter(yurt => yurt.cinsiyet === filters.cinsiyet);
  }
  
  if (filters.ozellikler?.length > 0) {
    filtered = filtered.filter(yurt => 
      filters.ozellikler.every(ozellik => yurt.ozellikler.includes(ozellik))
    );
  }
  
  return filtered;
};