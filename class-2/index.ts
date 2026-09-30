type Student = {
    name: string;
    firstName: string;
    age: number;
    score: grade[];
}

function calculateAverageScore(student:Student):Number{
    return student.score.reduce((acc,currVal) => {
        return acc + currVal.score.reduce((acc:Number,currVal:Grade) => {
            return acc+ (currVal.grade * currVal.coefficient)
        },new Number(0))
    },0)
}

function findHighestRank(student: Student[]):Student{
    return student.reduce((a,b) => {
        let highestScoreA = calculateAverageScore(a)
        let highestScoreB = calculateAverageScore(b)

        return a < b ? a : b
    })
}

type Grade = {
    grade:Number;
    coefficient:Number;
}