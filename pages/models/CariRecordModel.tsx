export default class CariRecord {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  company: string;
  position: string;
  notes: string;
  debt: number;
  credit: number;
  balanceDebt: number;
  balanceCredit: number;

  constructor(
    id: string | number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    postalCode: string,
    company: string,
    position: string,
    notes: string,
    debt: number,
    credit: number,
    balanceDebt: number,
    balanceCredit: number
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
    this.company = company;
    this.position = position;
    this.notes = notes;
    this.debt = debt;
    this.credit = credit;
    this.balanceDebt = balanceDebt;
    this.balanceCredit = balanceCredit;
  }
}
