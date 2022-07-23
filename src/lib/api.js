const BASE_URL = 'http://localhost:8000';

let TOKEN = undefined;


const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + TOKEN
  };
};

const getTokenHeaders = () => {
  return {
    'Authorization': 'Bearer ' + TOKEN
  };
};

export function setToken(token) { 
  TOKEN = token; 
}


export async function login(loginData) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${BASE_URL}/auth/login`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not login');
  }
  return jsonRes;
}

export async function signup(loginData) {
  loginData.hasAccepted = 1;
  loginData.password = 'Googlechrome97';
  loginData.birthdate = '1997-02-28';
  const opts = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${BASE_URL}/auth/signup`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not signup');
  }
  return jsonRes;
}

export async function getCompanyJobOffers(companyId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOffers/${companyId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not login');
  }
  return jsonRes;
}

export async function addJobOffer(data) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/createJobOffer`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createJobOffer');
  }
  return jsonRes;
}

export async function getUserCompanies() {
  const response = await fetch(`${BASE_URL}/company/getUserCompanies`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getUserCompanies');
  }
  return jsonRes;
}

export async function addCompany(data) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/company/newCompany`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not login');
  }
  return jsonRes;
}

export async function getJobOfferSkills(jobOfferId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOfferSkills/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferRequiredSkills');
  }
  return jsonRes;
}

export async function getJobOffer(jobOfferId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOffer/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferBonusSkills');
  }
  return jsonRes;
}

export async function getJobOfferUserApplicationsList(jobOfferId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOfferUserApplicationsList/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferUserApplicationsList');
  }
  return jsonRes;
}

export async function getJobOfferQuizs(jobOfferId) {
  const response = await fetch(`${BASE_URL}/quiz/getJobOfferQuizs/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferQuizs');
  }
  return jsonRes;
}

export async function addQuiz(data, jQuizId = null) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/${jQuizId ? 'updateQuiz/'+jQuizId : 'createQuiz'}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addQuiz');
  }
  return jsonRes;
}

export async function getJobOfferQuiz(quizId) {
  const response = await fetch(`${BASE_URL}/quiz/getQuiz/${quizId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getQuiz');
  }
  return jsonRes;
}


export async function addQuizTest(data, testId = null) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(testId !== 'new' ? data.test : data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/${testId && testId !== 'new' ? 'updateTest/'+testId : 'createTest'}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addTest');
  }
  return jsonRes;
}


export async function getQuizTest(testId) {
  const response = await fetch(`${BASE_URL}/quiz/getTest/${testId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getQuizTest');
  }
  return jsonRes;
}

export async function updateTestOption(data, optionId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/editTestOption/${optionId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addTest');
  }
  return jsonRes;
}

export async function updateTestText(data, textId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/editTestText/${textId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addTest');
  }
  return jsonRes;
}

export async function createNewTestOption(data, testId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/createNewTestOption/${testId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createNewTestOption');
  }
  return jsonRes;
}

export async function createNewTestText(data, testId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/createNewTestText/${testId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createNewTestText');
  }
  return jsonRes;
}


export async function removeTestOption(optionId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/removeTestOption/${optionId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createNewTestText');
  }
  return jsonRes;
}

export async function removeTestText(textId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/quiz/removeTestText/${textId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createNewTestText');
  }
  return jsonRes;
}

export async function getUsersDataOptions() {
  const response = await fetch(`${BASE_URL}/jobOffer/getUsersDataOptions`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getUsersDataOptions');
  }
  return jsonRes;
}

export async function getJobOfferUserData(jobOfferId) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOfferUserData/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferUserData');
  }
  return jsonRes;
}

export async function addJobOfferUserData(jobOfferId, optionId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/addJobOfferUserData/${jobOfferId}/${optionId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addJobOfferUserData');
  }
  return jsonRes;
}

export async function removejobOfferUserData(jobOfferId, optionId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/removejobOfferUserData/${jobOfferId}/${optionId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not removejobOfferUserData');
  }
  return jsonRes;
}

export async function updateJobOfferSkill(skill, skillId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(skill),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/updateJobOfferSkill/${skillId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not updateJobOfferSkill');
  }
  return jsonRes;
}

export async function addJobOfferSkill(skill) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(skill),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/addJobOfferSkill`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not addJobOfferSkill');
  }
  return jsonRes;
}

export async function deleteJobOfferSkill(skillId) {
  const opts = {
    method: 'POST',
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/removeJobOfferSkill/${skillId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not deleteJobOfferSkill');
  }
  return jsonRes;
}

export async function updateJobOffer(jobOffer, jobOfferId) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(jobOffer),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/jobOffer/updateJobOffer/${jobOfferId}`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not deleteJobOfferSkill');
  }
  return jsonRes;
}

export async function getJobOfferUserApplication(jobOfferId, userId) {
  const response = await fetch(`${BASE_URL}/userApplication/getUserApplication/${userId}/${jobOfferId}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferUserApplication');
  }
  return jsonRes;
}


export async function createUserApplication(data) {
  let formData = new FormData();
  if (data.cv) formData.append('cv', data.cv);
  if (data.photo) formData.append('photo', data.photo);
  if (data.salaryCheck) formData.append('salaryCheck', data.salaryCheck);
  formData.append('data', JSON.stringify({ uApp: data.uApp, uSkills: data.uSkills, uData: data.uData }));
  const opts = {
    method: 'POST',
    body: formData,
    headers: getTokenHeaders()
  };
  const response = await fetch(`${BASE_URL}/userApplication/createUserApplication`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createUserApplication');
  }
  return jsonRes;
}

export async function uploadUserTestImage(data, file) {
  let formData = new FormData();
  if (file) formData.append('file', file);
  if (data) formData.append('data', JSON.stringify(data));
  const opts = {
    method: 'POST',
    body: formData,
    headers: getTokenHeaders()
  };
  const response = await fetch(`${BASE_URL}/userApplication/uploadUserTestImage`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not uploadUserTestImage');
  }
  return jsonRes;
}


export async function createUserQuiz(data) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/userApplication/createUserQuiz`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createUserQuiz');
  }
  return jsonRes;
}

export async function createUserTests(data) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getHeaders()
  };
  const response = await fetch(`${BASE_URL}/userApplication/createUserTests`, opts);
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not createUserTests');
  }
  return jsonRes;
}

export async function getJobOfferFromLink(uuid) {
  const response = await fetch(`${BASE_URL}/jobOffer/getJobOfferFromLink/${uuid}`, { headers: getHeaders() });
  const jsonRes = await response.json();
  if (!response.ok) {
    throw new Error(jsonRes.message || 'Could not getJobOfferFromLink');
  }
  return jsonRes;
}
