import {JoursSemainEnum} from "@/src/models/Enums";

export function getNextClosestDate(targetDays: string[]): Date {
    const daysMap: Record<string, number> = {
        "Dimanche": 0, "Lundi": 1, "Mardi": 2, "Mercredi": 3, "Jeudi": 4, "Vendredi": 5, "Samedi": 6
    };

    const today = new Date();
    const currentDay = today.getDay();
    const targetIndexes = targetDays.map(day => daysMap[day]).sort((a, b) => a - b);

    let closestDayDiff = Infinity;
    let closestDate: Date | null = null;

    for (const targetDay of targetIndexes) {
        let diff = targetDay - currentDay;
        if (diff < 0) diff += 7;

        if (diff < closestDayDiff) {
            closestDayDiff = diff;
            closestDate = new Date();
            closestDate.setDate(today.getDate() + diff);
        }
    }

    return closestDate!;
}

export function date(date: string): Date  {

    return new Date(date);
}
