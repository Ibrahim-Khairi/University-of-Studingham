const DAY_INDEX = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4
};

export function generateLecturesFromPattern({
    courseId,
    moduleId,
    tutorId,
    year,
    weekBlock,
    pattern,
    academicYearStart
}) {
    const lectures = [];

    for (let week = weekBlock.start; week <= weekBlock.end; week++) {
        for (const slot of pattern) {
            const lectureDate = new Date(academicYearStart);
            lectureDate.setDate(
                lectureDate.getDate() + (week - 1) * 7 + DAY_INDEX[slot.day]
            );

            const [hour, minute] = slot.startTime.split(":").map(Number);
            const endHour = hour + slot.durationHours;

            lectures.push({
                courseId,
                moduleId,
                tutorId,
                year,
                weekNumber: week,
                date: lectureDate,
                day: slot.day,
                startTime: slot.startTime,
                endTime: `${String(endHour).padStart(2, "0")}:${minute}`
            });
        }
    }

    return lectures;
}