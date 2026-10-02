import { RegistrationStatus } from "@/features/registration/schemas/registration.schema";
import { CategoryOptions } from "@/lib/event-data";

interface ParticipantProps {
  id: string | undefined;
  fullname: string;
  cpf: string;
  birthDate: Date;
  gender: string;
  email: string;
  phoneNumber: string;
  cityState: string;
  emergencyContact: string;
  emergencyPhone: string;
  category: string;
  tshirtSize: string;
  team: string | undefined;
  extraLunchQuantity: number;
  termsCheck: boolean;
  status: RegistrationStatus;
}

export class Participant {
  private id?: string;
  private fullname: string;
  private cpf: string;
  private birthDate: Date;
  private gender: string;
  private email: string;
  private phoneNumber: string;
  private cityState: string;
  private emergencyContact: string;
  private emergencyPhone: string;
  private category: string;
  private tshirtSize: string;
  private team?: string;
  private extraLunchQuantity: number;
  private termsCheck: boolean;
  private status: RegistrationStatus;

  constructor(props: ParticipantProps) {
    this.id = props.id;
    this.fullname = props.fullname;
    this.cpf = props.cpf;
    this.birthDate = props.birthDate;
    this.gender = props.gender;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.cityState = props.cityState;
    this.emergencyContact = props.emergencyContact;
    this.emergencyPhone = props.emergencyPhone;
    this.category = props.category;
    this.tshirtSize = props.tshirtSize;
    this.team = props.team;
    this.extraLunchQuantity = props.extraLunchQuantity ?? 0;
    this.termsCheck = props.termsCheck;
    this.status = props.status ?? "pending";
  }

  get getId() {
    return this.id;
  }
  get getFullname() {
    return this.fullname;
  }
  get getCpf() {
    return this.cpf;
  }
  get getBirthDate() {
    return this.birthDate;
  }

  public getAge(): number {
    const today = new Date();

    let age = today.getFullYear() - this.birthDate.getFullYear();
    const monthDiff = today.getMonth() - this.birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < this.birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  calculateTotalValue(): number {
    return 0;
  }

  isCategoryValid(categoriesOptions: CategoryOptions[]) {
    const userAge = this.getAge();

    const selectedCategory = categoriesOptions.find(
      (cat) => cat.id === this.category,
    );

    if (!selectedCategory) return false;

    const matchGender =
      !selectedCategory.gender ||
      selectedCategory.gender === "Unissex" ||
      selectedCategory.gender === this.gender;

    const minAge = selectedCategory.minAge ?? 0;
    const maxAge = selectedCategory.maxAge ?? 150;
    const matchAge = userAge >= minAge && userAge <= maxAge;

    return matchAge && matchGender;
  }
}
