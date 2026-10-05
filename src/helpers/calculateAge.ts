export function calculateAge(
  birthDateString: string | Date | undefined,
): number {
  if (!birthDateString) return 0;

  const today = new Date();
  const birthDate =
    typeof birthDateString === "string"
      ? new Date(birthDateString)
      : birthDateString;

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
