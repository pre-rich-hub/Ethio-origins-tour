import { expect, test, type Page } from '@playwright/test'

const stamp = Date.now()
const destinationName = `Tour Test Destination ${stamp}`
const tourName = `Tour Creation Test ${stamp}`
const editedTourName = `Tour Creation Test Updated ${stamp}`
const imageFixture = '../frontend/public/icon-light-32x32.png'
const adminEmail = process.env.E2E_ADMIN_EMAIL ?? 'admin-test@ethio.local'
const adminPassword = process.env.E2E_ADMIN_PASSWORD ?? 'AdminTest123!'

async function apiData<T>(page: Page, path: string): Promise<T> {
  const response = await page.request.get(path)
  expect(response.ok(), `GET ${path}`).toBeTruthy()
  return (await response.json()).data as T
}

test('admin can select a destination and complete tour CRUD', async ({ page }) => {
  test.setTimeout(120_000)
  page.on('dialog', (dialog) => dialog.accept())

  await page.goto('/login')
  await page.getByLabel('Email').fill(adminEmail)
  await page.locator('#password').fill(adminPassword)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await expect(page).toHaveURL(/\/admin$/, { timeout: 30_000 })

  try {
    await page.goto('/admin/destinations')
    await page.getByTestId('add-destination').click()
    const destinationForm = page.getByTestId('destination-form')
    await destinationForm.getByLabel('Destination name').fill(destinationName)
    await destinationForm.getByLabel('Description').fill('Disposable destination for the create-tour browser test.')
    await destinationForm.locator('input[type="file"]').setInputFiles(imageFixture)
    await page.getByTestId('save-destination').click()
    await expect(page.getByText(destinationName)).toBeVisible()

    await page.goto('/admin/tours/new')
    const destinationSelect = page.getByLabel('Destination')
    await expect(destinationSelect.getByRole('option', { name: destinationName })).toHaveCount(1)
    await destinationSelect.selectOption({ label: destinationName })
    await expect(destinationSelect.locator('option:checked')).toHaveText(destinationName)

    await page.getByLabel('Tour Name').fill(tourName)
    await page.getByLabel('Adult Price ($)').fill('1200')
    await page.getByLabel('Child Price ($)').fill('600')
    await page.getByLabel('Rating (0-5)').fill('4.7')
    await page.getByLabel('Overview').fill('Disposable tour created to verify the destination selector and CRUD flow.')
    await page.locator('input[name="tourImages"]').setInputFiles(imageFixture)
    await page.getByTestId('save-tour').click()

    await expect(page).toHaveURL(/\/admin\/tours$/, { timeout: 30_000 })
    await expect(page.getByText(tourName)).toBeVisible()
    const tours = await apiData<Array<{ id: number; name: string; destination: { name: string } | null }>>(page, '/api/v1/admin/tours')
    const createdTour = tours.find((tour) => tour.name === tourName)
    expect(createdTour?.destination?.name).toBe(destinationName)

    await page.getByTestId(`edit-tour-${createdTour!.id}`).click()
    await page.getByLabel('Tour Name').fill(editedTourName)
    await page.getByTestId('save-tour').click()
    await expect(page).toHaveURL(/\/admin\/tours$/, { timeout: 30_000 })
    await expect(page.getByText(editedTourName)).toBeVisible()

    await page.getByTestId(`delete-tour-${createdTour!.id}`).click()
    await expect(page.getByTestId(`tour-${createdTour!.id}`)).toHaveCount(0)
  } finally {
    const tours = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/tours').catch(() => [])
    for (const tour of tours.filter((item) => [tourName, editedTourName].includes(item.name))) {
      await page.request.delete(`/api/v1/admin/tours/${tour.id}`)
    }

    const destinations = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/destinations').catch(() => [])
    for (const destination of destinations.filter((item) => item.name === destinationName)) {
      await page.request.delete(`/api/v1/admin/destinations/${destination.id}`)
    }
  }
})
