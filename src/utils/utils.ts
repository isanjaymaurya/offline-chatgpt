export function getGreeting(): string{
    const currentHr = new Date().getHours();

    if (currentHr < 12){
        return "Morning";
    } else if (currentHr < 18){
        return "Afternoon";
    } else {
        return "Evening";
    }
}
