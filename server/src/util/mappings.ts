import moment from 'moment'

interface Answer {
  detailInfo?: string
  questionCode: string
  selectedOption: 'YES' | 'NO' | undefined
}

const DEFAULT_ANSWER = Object.freeze({
  detailInfo: '',
  questionCode: '',
  selectedOption: 'Off'
})

export default (application: any) => {
  const a = application
  const { applicant = {} } = a
  const getEmployerAddress = (idx: number) => {
    if (!a.employmentRecords?.[idx]) {
      return ''
    }
    const {
      street,
      city,
      state,
      zipCode,
    } = a.employmentRecords?.[idx]?.employer?.address
    return `${street} ${city}, ${state} ${zipCode}`
  }

  const getAnswer = (questionCode: string, subQuestionCode?: string) => {
    const rootAnswer = a.answers && a.answers.find((answer: Answer) => answer.questionCode === questionCode) || DEFAULT_ANSWER
    const subQuestionAnswer =
      a.answers &&
      a.answers?.subQuestionsAnwers &&  // TODO: fix typo in field name
      a.answers?.subQuestionsAnwers.find((answer: Answer) => answer.questionCode === subQuestionCode) // TODO: fix typo in field name
    if (!a.answers?.length || (!rootAnswer && !subQuestionCode)) {
      return 'Off'
    }
    if (subQuestionAnswer) {
      return subQuestionAnswer.selectedOption === 'YES' ? 'Yes' : 'No'
    }
    return rootAnswer.selectedOption === "YES" ? "Yes" : "No"
  }

  const getDetailedAnswer = (questionCode: string, subQuestionCode?: string) => {
    const rootAnswer = a.answers && a.answers.find((answer: Answer) => answer.questionCode === questionCode) || DEFAULT_ANSWER
    const subQuestionAnswer =
      a.answers &&
      a.answers?.subQuestionsAnwers &&  // TODO: fix typo in field name
      a.answers?.subQuestionsAnwers.find((answer: Answer) => answer.questionCode === subQuestionCode) // TODO: fix typo in field name

    if (!a.answers.length || (!rootAnswer && !subQuestionAnswer) ) {
      return ''
    }
    if (subQuestionAnswer) {
      return subQuestionAnswer.detailInfo
    }
    return rootAnswer.detailInfo
  }

  const getEmployerField = (field: string, idx: number) => a.employmentRecords?.[idx]?.employer?.[field]

  const getEmploymentDate = (field: 'started'|'ended', idx: number) => a.employmentRecords?.[idx]
    ? moment(a.employmentRecords?.[idx]?.[field]).format('MM/DD/YYYY')
    : ''

  const mappedForm: any = {
    'Applicants Name Last First Middle': `${applicant.lastName}, ${applicant.firstName}, ${applicant.middleName}`,
    'Social Security Number': applicant.ssn,
    'Date of Birth Mo Day Yr': moment(applicant.dob).format('LL'),
    'Applicants Mailing Address Street or PO': applicant.address?.street,
    'City': applicant.address?.city,
    'State': applicant.address?.state,
    'Zip Code': applicant.address?.zipCode,
    'Phone Number': applicant.phone,
    'Check Box1': applicant.gender,
    'Applicant Email Address': applicant.email,
    'Name of Employer or Self EmploymentRow1': getEmployerField('name', 0),
    'Name of Employer or Self EmploymentRow2': getEmployerField('name', 1),
    'Name of Employer or Self EmploymentRow3': getEmployerField('name', 2),
    'Name of Employer or Self EmploymentRow4': getEmployerField('name', 3),
    'Name of Employer or Self EmploymentRow5': getEmployerField('name', 4),
    'Employer AddressRow1': getEmployerAddress(0),
    'Employer AddressRow2': getEmployerAddress(1),
    'Employer AddressRow3': getEmployerAddress(2),
    'Employer AddressRow4': getEmployerAddress(3),
    'Employer AddressRow5': getEmployerAddress(4),
    'Phone NumberRow1': getEmployerField('phone', 0),
    'Phone NumberRow2': getEmployerField('phone', 1),
    'Phone NumberRow3': getEmployerField('phone', 2),
    'Phone NumberRow4': getEmployerField('phone', 3),
    'Phone NumberRow5': getEmployerField('phone', 4),
    'ToRow1': getEmploymentDate('started', 0),
    'ToRow2': getEmploymentDate('started', 1),
    'ToRow3': getEmploymentDate('started', 2),
    'ToRow4': getEmploymentDate('started', 3),
    'ToRow5': getEmploymentDate('started', 4),
    'FromRow1': getEmploymentDate('ended', 0),
    'FromRow2': getEmploymentDate('ended', 1),
    'FromRow3': getEmploymentDate('ended', 2),
    'FromRow4': getEmploymentDate('ended', 3),
    'FromRow5': getEmploymentDate('ended', 4),
    'Check Box2': applicant?.isHispanicLatino ? 'Yes' : 'No',
    'Check Box3': applicant?.contactMethod === 'Phone' ? 'Yes' : 'No',
    // 'Check Box4': applicant?.races, // race?
    'Check Box5': getAnswer('C_1'),
    'Were you scheduled to start a new job that has since closed as a direct result of the COVID19 public health emergency YES NO If YES please enter the date you were expected to start work the date your new job closed and the name of the business': getDetailedAnswer('C_3'),
    'Check Box6': getAnswer('C_2', 'C_2_1'),
    'Check Box7': getAnswer('C_2', 'C_2_2'),
    'Check Box8': getAnswer('C_2', 'C_2_3'),
    'Check Box9': getAnswer('C_2', 'C_2_4'),
    'Check Box10': getAnswer('C_3'),
    'Check Box11': getAnswer('C_4'),
    'Have you been diagnosed with COVID19 or are you experiencing symptoms of COVID19 and seeking a medical diagnosis YES NO If YES please enter the date you were diagnosed or when you began experiencing symptoms': getDetailedAnswer('C_4'),
    'Check Box12': getAnswer('C_5'),
    'Has a member of your household been diagnosed with COVID19 YES NO If YES please enter the date the household member was diagnosed': getDetailedAnswer('C_5'),
    'Check Box13': getAnswer('C_6'),
    'Are you caring for a family member or a member of your household who has been diagnosed with COVID19 YES NO If YES please enter the date the household member was diagnosed': getDetailedAnswer('C_6'),
    'Check Box14': getAnswer('C_7'),
    'Is there a child or other person in the household for whom you have the primary caregiving responsibility for that is unable to attend school or another facility that closed as a direct result of the COVID19 public health emergency and such school or facility care is required for you to work YES NO If YES please enter the name of the facility that closed and the date of the closure': getDetailedAnswer('C_7'),
    'Check Box15': getAnswer('C_8'),
    'Have you become the breadwinner or provider of major support for a household because the head of the household has died as a direct result of COVID19 YES NO If YES please enter the date you became the provider for a household': getDetailedAnswer('C_8'),
    'Check Box16': getAnswer('C_9'),
    'Has your place of employment closed as a direct result of the COVID19 public health emergency YES NO If YES please enter the date your place of employment closed and the name of the business': getDetailedAnswer('C_9'),
    'Check Box17': getAnswer('C_10'),
    'Have you quit a job as a direct result of COVID19 YES NO If YES please enter the date you quit the name of the business and the reason you voluntarily left work': getDetailedAnswer('C_10'),
    'Check Box18': getAnswer('C_11'),
    'Are you unable to reach your place of employment because you have been advised by a health care provider to self quarantine due to concerns related to COVID19 YES NO If YES please enter the reason why you are unable to reach your place of employment and the date this began': getDetailedAnswer('C_11'),
    'Check Box19': getAnswer('C_12'),
    'Are you unable to reach your place of employment because of a quarantine imposed as a direct result of the COVID19 public health emergency YES NO If YES please enter the reason why you are unable to reach your place of employment and the date this began': getDetailedAnswer('C_12'),
    'Check Box20': getAnswer('C_13'),
    'Do you have the ability to continue to receive payment from your employer while working from home YES NO If YES please enter the reason why you have refused to accept a teleworking option from your employer': getDetailedAnswer('C_13'),
    'Check Box21': getAnswer('C_14'),
    'Are you receiving paid sick leave or other paid leave benefits YES NO If YES please enter the date you began to receive paid sick leave or paid leave benefits and who you are receiving this payment from if you know an end date please include that': getDetailedAnswer('C_14'),
    'Check Box22': getAnswer('D_1'),
    'At the time of the pandemic was this selfemployment your primary occupation and primary means of livelihood YES NO If NO explain': getDetailedAnswer('D_1'),
    'Check Box23': getAnswer('D_2'),
    'What services did you perform': getDetailedAnswer('D_2'),
    'Check Box24': getAnswer('D_3'),
    'Do you have a business name': getDetailedAnswer('D_3'),
    'Check Box25': getAnswer('D_4'),
    'Do you file a business return Ex Schedule C 1120 or a 1065 YES NO If YES please list what returns you file': getDetailedAnswer('D_4'),
    'Check Box26': getAnswer('D_5'),
    'Check Box27': getAnswer('D_6', 'D_6_1'),
    'Check Box28': getAnswer('D_7'),
    'Check Box29': getAnswer('D_8'),
    'Check Box30': getAnswer('D_9'),
    'Do you have an investment in tools equipment etc YES NO If YES how much': getDetailedAnswer('D_9'),
    'Check Box31': getAnswer('D_10'),
    'Check Box32': getAnswer('D_11'),
    'Do you have more than one client YES NO If YES how many clients do you have': getDetailedAnswer('D_11'),
    'Check Box33': getAnswer('E_1'),
    'Check Box34': getAnswer('E_2'),
    'Check Box36': getAnswer('F_1'),
    'Check Box37': getAnswer('F_1', 'F_1_1'),
    'Alien Reg': getDetailedAnswer('F_1', 'F_1_1'), // TODO: figure out why this isn't working
    'Date Month Day Year': moment(application.dateApplied).format('LL'),
  }

  Object.keys(mappedForm).forEach((mapping) => {
    if (typeof mappedForm[mapping] === 'string') {
      mappedForm[mapping] = mappedForm[mapping].replace('undefined,', '')
    }
    if (typeof mappedForm[mapping] === 'undefined') {
      mappedForm[mapping] = ''
    }
  })

  return mappedForm
}
