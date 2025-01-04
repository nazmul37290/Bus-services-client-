export function generateSeatNumbers(totalSeats) {
  const seatNumbers = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Series of letters

  for (let i = 0; i < totalSeats; i++) {
    const letter = alphabet[Math.floor(i / 4)]; // Changes every 4 seats
    const number = (i % 4) + 1; // Cycles between 1-4
    seatNumbers.push(`${letter}${number}`);
  }

  return seatNumbers;
}
