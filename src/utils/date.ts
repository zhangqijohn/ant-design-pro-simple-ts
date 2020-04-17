import moment from 'moment';

export const rangePickerOptions = {
    '今日': [moment(), moment()],
    '昨日': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
    '最近一周': [moment().subtract(6, 'days'), moment()],
    '最近一个月': [moment().subtract(1, 'month'), moment()],
    '最近三个月': [moment().subtract(3, 'month'), moment()],
    '最近半年': [moment().subtract(6, 'month'), moment()],
    '最近一年': [moment().subtract(1, 'year'), moment()]
}

export function simpleFormat (date:any): any {
  if (date === undefined || date === null || date === '') {
    return date
  } else {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  }
}
