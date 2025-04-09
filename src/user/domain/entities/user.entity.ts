export class User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  salutation: string;
  title?: string;
  phone?: string;

  toSendEmail(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    salutation: string = '',
    title: string = ''
  ): void {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.salutation = salutation;
    this.title = title;
  }

  toSendWhatsApp(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    salutation: string = '',
    title: string = ''
  ): void {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.salutation = salutation;
    this.title = title;
  }

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email || '');
  }

  isValidPhone(): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(this.phone || '');
  }
}
