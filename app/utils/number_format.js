import moment from "moment";

export const 
MonthFullYear = ({date}) => {
	return moment(date).format('MM, YYYY'); // 7 2025
},
DayMonthFullYearFullTime = ({date}) => {
	return moment(date).format('MMMM Do YYYY, h:mm:ss a'); // July 24th 2025, 10:37:45 am
}
,
MonthDayFullYear = ({date}) => {
	return moment(date).format('MMM DD, YYYY'); // Jul 24 2025
}