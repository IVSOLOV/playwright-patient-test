# 🧪 Playwright Patient Test (UI + API)

This project demonstrates how to automate a real-world healthcare workflow using [Playwright](https://playwright.dev/). It creates a new patient via the UI and verifies the creation through an API call — showcasing a hybrid test approach (UI + API + Page Object Model).

---

## 📌 Test Scenario

- Navigate to the "New Patient" form via dashboard
- Fill out the form with randomized patient data
- Save the patient through UI interaction
- Send a backend API request to verify the patient exists in the system

---

## 🧠 Technologies Used

- ✅ [Playwright](https://playwright.dev/)
- ✅ TypeScript
- ✅ Page Object Model (POM)
- ✅ REST API validation

---

## 📂 Project Structure

playwright-patient-test/ │ ├── tests/ │ └── createNewPatient.spec.ts # Main test (UI + API verification) │ ├── pages/ │ ├── Dashboard.ts # Page object for dashboard navigation │ └── NewPatientsPage.ts # Page object for new patient form │ └── README.md # You are here!

---

## 🧪 Example API Validation Logic

```ts
const response = await request.get(`/api/patients?name=${encodeURIComponent(patientName)}`);
expect(response.ok()).toBeTruthy();

const data = await response.json();
expect(data).toEqual(
  expect.arrayContaining([
    expect.objectContaining({ name: patientName })
  ])
);




##  How to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/IVSOLOV/playwright-patient-test.git
   cd playwright-patient-test
   npm install
   npx playwright test tests/createNewPatient.spec.ts

Created by Ivan Solovko
QA Automation Engineer | Playwright Enthusiast



