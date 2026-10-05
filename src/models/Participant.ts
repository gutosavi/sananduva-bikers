import {
  RegistrationFormData,
  RegistrationStatus,
} from "@/features/registration/schemas/registration.schema";
import { EventPrices } from "@/lib/event-data";

export interface ParticipantProps extends Omit<
  RegistrationFormData,
  "birthDate"
> {
  id?: string;
  birthDate: Date | string;
  status?: RegistrationStatus;
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
  private status?: RegistrationStatus;

  constructor(props: ParticipantProps) {
    this.id = props.id;
    this.fullname = props.fullname;
    this.cpf = props.cpf;
    this.birthDate =
      typeof props.birthDate === "string"
        ? new Date(props.birthDate)
        : props.birthDate;
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

  public calculateTotalValue(eventPrices: EventPrices): number {
    const registrationFee = eventPrices.registrationFee;
    const extraLunchQuantity = this.extraLunchQuantity ?? 0;
    const extraLunchCost = extraLunchQuantity * eventPrices.extraLunchFee;

    return registrationFee + extraLunchCost;
  }
}
