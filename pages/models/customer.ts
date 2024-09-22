// CariRecordModel.ts
export interface CariRecord {
  id: string | number; // Kayıt ID'si
  firstName: string; // Ad
  lastName: string; // Soyad
  email: string; // E-posta
  phone: string; // Telefon
  address: string; // Adres
  city: string; // Şehir
  country: string; // Ülke
  postalCode: string; // Posta kodu
  company: string; // Şirket
  position: string; // Pozisyon
  notes: string; // Notlar
  debt: number; // Borç
  credit: number; // Alacak
  balanceDebt: number; // Bakiye Borç
  balanceCredit: number; // Bakiye Alacak
}

export const createCariRecord = (data: Partial<CariRecord>): CariRecord => {
  return {
    id: data.id ?? '',
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    email: data.email ?? '',
    phone: data.phone ?? '',
    address: data.address ?? '',
    city: data.city ?? '',
    country: data.country ?? '',
    postalCode: data.postalCode ?? '',
    company: data.company ?? '',
    position: data.position ?? '',
    notes: data.notes ?? '',
    debt: data.debt ?? 0,
    credit: data.credit ?? 0,
    balanceDebt: data.balanceDebt ?? 0,
    balanceCredit: data.balanceCredit ?? 0,
  };
};
