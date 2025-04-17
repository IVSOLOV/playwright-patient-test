import { test, expect, request } from '@playwright/test';
import { Dashboard } from '../pages/Dashboard';
import { NewPatientsPage } from '../pages/NewPatientsPage';

test('Create and Save a new patient, then verify via API', async ({ page, request }) => {
  const dashboardPage = new Dashboard(page);
  const newPatientsPage = new NewPatientsPage(page);

  const patientName = generateRandomName();
  const dob = generateRandomDOB(1950, 2005);

  // UI flow to create patient
  await dashboardPage.navigateToNewPatients();
  await newPatientsPage.fillForm(patientName, dob);
  await newPatientsPage.savePatient();

  // Simple API call to verify patient exists
  const response = await request.get(`/api/patients?name=${encodeURIComponent(patientName)}`);
  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: patientName })
    ])
  );
});

// Utilities
function generateRandomName(): string {
  const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Megan', 'David', 'Sarah'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Miller', 'Davis', 'Garcia'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function generateRandomDOB(startYear: number, endYear: number): string {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}-${year}`;
}
