document.getElementById('btnExtract').addEventListener('click', extractData);

function extractData() {
  const id = document.getElementById('nationalId').value.trim();
  const resultDiv = document.getElementById('result');
  
  // تحقق الرقم القومي 14 رقم
  if (!/^\d{14}$/.test(id)) {
    resultDiv.style.color = 'red';
    resultDiv.textContent = 'الرجاء إدخال رقم قومي صحيح مكون من 14 رقم';
    return;
  }
  
  // استخراج تاريخ الميلاد من الرقم القومي (الأرقام 2-7)
  const centuryDigit = parseInt(id.charAt(0)); // 1 أو 2 أو 3 أو 4
  let year = parseInt(id.substring(1, 3));
  const month = parseInt(id.substring(3, 5));
  const day = parseInt(id.substring(5, 7));
  
  // تحديد القرن
  let fullYear;
  if (centuryDigit === 1 || centuryDigit === 2) {
    fullYear = 1900 + year;
  } else if (centuryDigit === 3 || centuryDigit === 4) {
    fullYear = 2000 + year;
  } else {
    fullYear = 1900 + year; // افتراضي
  }
  
  const birthDate = new Date(fullYear, month - 1, day);
  if (birthDate.getFullYear() !== fullYear || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) {
    resultDiv.style.color = 'red';
    resultDiv.textContent = 'تاريخ الميلاد غير صحيح في الرقم القومي';
    return;
  }
  
  // حساب العمر
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  // حساب الأيام المتبقية على عيد الميلاد القادم
  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (today > nextBirthday) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const diffTime = nextBirthday - today;
  const daysToBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // حساب موعد التقاعد (سن التقاعد 60 سنة)
  const retirementAge = 60;
  const yearsToRetire = retirementAge - age;
  const retireYear = today.getFullYear() + yearsToRetire;
  
  // استخراج رمز المحافظة (الأرقام 8-9)
  const governorateCodes = {
    '01': 'القاهرة',
    '02': 'الإسكندرية',
    '03': 'بورسعيد',
    '04': 'السويس',
    '11': 'دمياط',
    '12': 'الدقهلية',
    '13': 'الشرقية',
    '14': 'القليوبية',
    '15': 'كفر الشيخ',
    '16': 'الغربية',
    '17': 'المنوفية',
    '18': 'البحيرة',
    '19': 'الإسماعيلية',
    '21': 'الجيزة',
    '22': 'بني سويف',
    '23': 'الفيوم',
    '24': 'المنيا',
    '25': 'أسيوط',
    '26': 'سوهاج',
    '27': 'قنا',
    '28': 'أسوان',
    '29': 'الأقصر',
  };
  
  const govCode = id.substring(7, 9);
  const governorate = governorateCodes[govCode] || 'غير معروف';
  
  // تحديد البرج الفلكي
  function getZodiacSign(day, month) {
    const zodiacSigns = [
      { sign: "الجدي", startDate: new Date(0, 0, 1), endDate: new Date(0, 0, 19) },
      { sign: "الدلو", startDate: new Date(0, 0, 20), endDate: new Date(0, 1, 18) },
      { sign: "الحوت", startDate: new Date(0, 1, 19), endDate: new Date(0, 2, 20) },
      { sign: "الحمل", startDate: new Date(0, 2, 21), endDate: new Date(0, 3, 19) },
      { sign: "الثور", startDate: new Date(0, 3, 20), endDate: new Date(0, 4, 20) },
      { sign: "الجوزاء", startDate: new Date(0, 4, 21), endDate: new Date(0, 5, 20) },
      { sign: "السرطان", startDate: new Date(0, 5, 21), endDate: new Date(0, 6, 22) },
      { sign: "الأسد", startDate: new Date(0, 6, 23), endDate: new Date(0, 7, 22) },
      { sign: "العذراء", startDate: new Date(0, 7, 23), endDate: new Date(0, 8, 22) },
      { sign: "الميزان", startDate: new Date(0, 8, 23), endDate: new Date(0, 9, 22) },
      { sign: "العقرب", startDate: new Date(0, 9, 23), endDate: new Date(0, 10, 21) },
      { sign: "القوس", startDate: new Date(0, 10, 22), endDate: new Date(0, 11, 21) },
      { sign: "الجدي", startDate: new Date(0, 11, 22), endDate: new Date(0, 11, 31) },
    ];
    const birth = new Date(0, month -1, day);
    for (let i = 0; i < zodiacSigns.length; i++) {
      if (birth >= zodiacSigns[i].startDate && birth <= zodiacSigns[i].endDate) {
        return zodiacSigns[i].sign;
      }
    }
    return "غير معروف";
  }
  
  const zodiacSign = getZodiacSign(day, month);
  
  // عرض النتائج
  resultDiv.style.color = '#000';
  resultDiv.innerHTML = `
    <p><strong>تاريخ الميلاد:</strong> ${birthDate.toLocaleDateString('ar-EG')}</p>
    <p><strong>العمر الحالي:</strong> ${age} سنة</p>
    <p><strong>محل الإقامة (المحافظة):</strong> ${governorate}</p>
    <p><strong>عدد الأيام المتبقية على عيد الميلاد القادم:</strong> ${daysToBirthday} يوم</p>
    <p><strong>متوقع التقاعد في سنة:</strong> ${retireYear} (${yearsToRetire > 0 ? yearsToRetire + " سنة متبقية" : "متقاعد"})</p>
    <p><strong>البرج الفلكي:</strong> ${zodiacSign}</p>
  `;
}
