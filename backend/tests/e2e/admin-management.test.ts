import { expect, test, type Page } from '@playwright/test'

const stamp = Date.now()
const names = {
  destination: `E2E Destination ${stamp}`,
  category: `E2E Category ${stamp}`,
  tour: `E2E Tour ${stamp}`,
  tourEdited: `E2E Tour Updated ${stamp}`,
  testimonial: `E2E Guest ${stamp}`,
  testimonialEdited: `E2E Guest Updated ${stamp}`,
  blogCategory: `E2E Editorial ${stamp}`,
  blog: `E2E Story ${stamp}`,
  contact: `E2E Contact ${stamp}`,
  subscriber: `e2e-subscriber-${stamp}@example.com`,
  booking: `E2E Traveler ${stamp}`,
  document: `e2e-guide-${stamp}.docx`,
}

const imageFixture = '../frontend/public/icon-light-32x32.png'
const adminEmail = process.env.E2E_ADMIN_EMAIL ?? 'admin-test@ethio.local'
const adminPassword = process.env.E2E_ADMIN_PASSWORD ?? 'AdminTest123!'

test.describe.configure({ retries: 0 })

async function apiData<T>(page: Page, path: string): Promise<T> {
  const response = await page.request.get(path)
  expect(response.ok(), `GET ${path}`).toBeTruthy()
  return (await response.json()).data as T
}

async function gotoPage(page: Page, path: string) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await page.goto(path, { waitUntil: 'load' })
      return
    } catch (error) {
      if (!(error instanceof Error) || !error.message.includes('ERR_ABORTED') || attempt === 2) throw error
      await page.waitForTimeout(250)
    }
  }
}

test('all admin management workflows create and expose records', async ({ page }) => {
  test.setTimeout(300_000)
  page.on('dialog', (dialog) => dialog.accept())

  await gotoPage(page, '/login')
  await page.getByLabel('Email').fill(adminEmail)
  await page.locator('#password').fill(adminPassword)
  await page.getByRole('button', { name: 'Sign In' }).click()
  await expect(page).toHaveURL(/\/admin$/, { timeout: 30_000 })
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

  try {
    await gotoPage(page, '/admin/destinations')
    await page.getByTestId('add-destination').click()
    const destinationForm = page.getByTestId('destination-form')
    await destinationForm.getByLabel('Destination name').fill(names.destination)
    await destinationForm.getByLabel('Description').fill('A disposable destination created by the admin browser test.')
    await destinationForm.locator('input[type="file"]').setInputFiles(imageFixture)
    await page.getByTestId('save-destination').click()
    await expect(page.getByText(names.destination)).toBeVisible()

    await gotoPage(page, '/admin/categories')
    const categoryForm = page.getByTestId('tour-category-form')
    await categoryForm.locator('input[name="categoryName"]').fill(names.category)
    await categoryForm.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText(names.category)).toBeVisible()

    await gotoPage(page, '/admin/tours')
    const existingTours = await apiData<Array<{ id: number }>>(page, '/api/v1/admin/tours')
    await expect(page.getByTestId('tour-count')).toContainText(`Showing all ${existingTours.length} of ${existingTours.length}`)
    for (const existingTour of existingTours) {
      await expect(page.getByTestId(`tour-${existingTour.id}`)).toBeVisible()
    }
    await page.getByTestId('add-tour').click()
    await expect(page).toHaveURL(/\/admin\/tours\/new$/)
    await page.getByLabel('Tour Name').fill(names.tour)
    await page.getByLabel('Destination').selectOption({ label: names.destination })
    await page.getByLabel('Adult Price ($)').fill('1250')
    await page.getByLabel('Child Price ($)').fill('650')
    await page.getByLabel('Rating (0-5)').fill('4.8')
    await page.getByLabel('Featured Tour').check()
    await page.getByLabel('Overview').fill('A complete disposable tour created from the real admin form.')
    await page.locator('input[name="tourImages"]').setInputFiles(imageFixture)
    await page.getByText(names.category, { exact: true }).click()
    await page.getByTestId('save-tour').click()
    await expect(page).toHaveURL(/\/admin\/tours$/, { timeout: 30_000 })
    await expect(page.getByText(names.tour)).toBeVisible()

    const toursAfterCreate = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/tours')
    const createdTour = toursAfterCreate.find((item) => item.name === names.tour)
    expect(createdTour).toBeTruthy()
    await page.getByTestId(`edit-tour-${createdTour!.id}`).click()
    await expect(page).toHaveURL(new RegExp(`/admin/tours/${createdTour!.id}$`))
    await page.getByLabel('Tour Name').fill(names.tourEdited)
    await page.getByLabel('Overview').fill('The existing tour was successfully updated through the admin dashboard.')
    await page.getByTestId('save-tour').click()
    await expect(page).toHaveURL(/\/admin\/tours$/, { timeout: 30_000 })
    await expect(page.getByText(names.tourEdited)).toBeVisible()

    await gotoPage(page, '/admin/testimonials')
    const existingTestimonials = await apiData<Array<{ id: number }>>(page, '/api/v1/admin/testimonials')
    await expect(page.getByTestId('testimonial-count')).toContainText(`Showing all ${existingTestimonials.length}`)
    for (const testimonial of existingTestimonials) {
      await expect(page.getByTestId(`testimonial-${testimonial.id}`)).toBeVisible()
    }

    await page.getByTestId('add-testimonial').click()
    const testimonialForm = page.getByTestId('testimonial-form')
    await testimonialForm.getByLabel('Guest name').fill(names.testimonial)
    await testimonialForm.getByLabel('Profession or trip').fill('E2E Explorer')
    await testimonialForm.getByLabel('Guest message').fill('The admin testimonial workflow works beautifully.')
    await page.getByTestId('save-testimonial').click()
    await expect(page.getByText(names.testimonial)).toBeVisible()

    const createdTestimonials = await apiData<Array<{ id: number; reviewerName: string }>>(page, '/api/v1/admin/testimonials')
    const createdTestimonial = createdTestimonials.find((item) => item.reviewerName === names.testimonial)
    expect(createdTestimonial).toBeDefined()
    await page.getByTestId(`edit-testimonial-${createdTestimonial!.id}`).click()
    const editTestimonialForm = page.getByTestId('testimonial-form')
    await editTestimonialForm.getByLabel('Guest name').fill(names.testimonialEdited)
    await editTestimonialForm.getByLabel('Guest message').fill('The testimonial was successfully updated through the admin dashboard.')
    await page.getByTestId('save-testimonial').click()
    await expect(page.getByText(names.testimonialEdited)).toBeVisible()
    await expect(page.getByText('The testimonial was successfully updated through the admin dashboard.')).toBeVisible()

    await page.getByTestId(`delete-testimonial-${createdTestimonial!.id}`).click()
    await expect(page.getByTestId(`testimonial-${createdTestimonial!.id}`)).toHaveCount(0)

    await gotoPage(page, '/admin/blog')
    const blogCategoryForm = page.getByTestId('blog-category-form')
    await blogCategoryForm.locator('input[name="name"]').fill(names.blogCategory)
    await blogCategoryForm.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText(names.blogCategory)).toBeVisible()
    await page.getByTestId('add-blog-post').click()
    const blogForm = page.getByTestId('blog-form')
    await blogForm.getByLabel('Title').fill(names.blog)
    await blogForm.getByLabel('Category').selectOption({ label: names.blogCategory })
    await blogForm.getByLabel(/Featured image/).setInputFiles(imageFixture)
    await blogForm.getByLabel('Article content').fill('Disposable editorial content created through the admin blog form.')
    await page.getByTestId('save-blog-post').click()
    await expect(page.getByText(names.blog)).toBeVisible()

    const tours = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/tours')
    const tour = tours.find((item) => item.name === names.tourEdited)
    expect(tour).toBeTruthy()

    await gotoPage(page, '/admin/gallery')
    await page.getByTestId('add-gallery-image').click()
    const galleryForm = page.getByTestId('gallery-form')
    await galleryForm.getByLabel('Image').setInputFiles(imageFixture)
    await galleryForm.getByLabel('Related tour (optional)').selectOption({ label: names.tourEdited })
    const galleryCreated = page.waitForResponse((response) =>
      response.url().includes('/api/v1/admin/gallery') && response.request().method() === 'POST',
    )
    await page.getByTestId('save-gallery-image').click()
    expect((await galleryCreated).status()).toBe(201)
    await expect(page.locator('article[data-testid^="gallery-"]')).toHaveCount(2)

    const bookingResponse = await page.request.post('/api/v1/bookings', {
      data: {
        tourId: tour!.id,
        fullName: names.booking,
        email: `e2e-booking-${stamp}@example.com`,
        phone: '+251900000000',
        country: 'Ethiopia',
        chosenDate: '2027-01-20',
        adults: 2,
        children: 1,
      },
    })
    expect(bookingResponse.ok()).toBeTruthy()
    await gotoPage(page, '/admin/bookings')
    await expect(page.getByText(names.booking)).toBeVisible()
    const bookings = await apiData<Array<{ id: number; fullName: string }>>(page, '/api/v1/admin/bookings')
    const booking = bookings.find((item) => item.fullName === names.booking)
    expect(booking).toBeTruthy()
    await page.getByTestId(`booking-status-${booking!.id}`).selectOption('Confirmed')
    await expect(page.getByTestId(`booking-status-${booking!.id}`)).toHaveValue('Confirmed')

    const contactResponse = await page.request.post('/api/v1/contact', {
      data: { name: names.contact, email: `e2e-contact-${stamp}@example.com`, message: 'Please help plan an E2E journey.' },
    })
    expect(contactResponse.ok()).toBeTruthy()
    await gotoPage(page, '/admin/contacts')
    await expect(page.getByText(names.contact)).toBeVisible()
    const contacts = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/contacts')
    const contact = contacts.find((item) => item.name === names.contact)
    expect(contact).toBeTruthy()
    await page.getByTestId(`reply-contact-${contact!.id}`).click()
    const replyForm = page.getByTestId('contact-reply-form')
    await replyForm.getByLabel('Message').fill('Your test journey is ready to plan.')
    await page.getByTestId('send-contact-reply').click()
    await expect(page.getByText(/Reply sent to/)).toBeVisible()

    const subscriberResponse = await page.request.post('/api/v1/subscribe', { data: { email: names.subscriber } })
    expect(subscriberResponse.ok()).toBeTruthy()
    await gotoPage(page, '/admin/subscribers')
    await expect(page.getByText(names.subscriber)).toBeVisible()

    await gotoPage(page, '/admin/documents')
    await page.locator('input[type="file"]').setInputFiles({
      name: names.document,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      buffer: Buffer.from('disposable e2e document'),
    })
    await page.getByRole('button', { name: 'Upload', exact: true }).click()
    await expect(page.getByText(names.document)).toBeVisible()

    await gotoPage(page, '/admin')
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 30_000 })
    await expect(page.getByText('Tours', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Destinations', { exact: true }).first()).toBeVisible()

    await gotoPage(page, '/admin/tours')
    const finalTours = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/tours')
    const finalTour = finalTours.find((item) => item.name === names.tourEdited)
    expect(finalTour).toBeTruthy()
    await page.getByTestId(`delete-tour-${finalTour!.id}`).click()
    await expect(page.getByTestId(`tour-${finalTour!.id}`)).toHaveCount(0)
  } finally {
    const gallery = await apiData<Array<{ id: number; tourId: number | null }>>(page, '/api/v1/admin/gallery').catch(() => [])
    const tours = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/tours').catch(() => [])
    const tour = tours.find((item) => [names.tour, names.tourEdited].includes(item.name))
    for (const item of gallery.filter((entry) => entry.tourId === tour?.id)) await page.request.delete(`/api/v1/admin/gallery/${item.id}`)

    const bookings = await apiData<Array<{ id: number; fullName: string }>>(page, '/api/v1/admin/bookings').catch(() => [])
    for (const item of bookings.filter((entry) => entry.fullName === names.booking)) await page.request.delete(`/api/v1/admin/bookings/${item.id}`)

    const contacts = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/contacts').catch(() => [])
    for (const item of contacts.filter((entry) => entry.name === names.contact)) await page.request.delete(`/api/v1/admin/contacts/${item.id}`)

    const testimonials = await apiData<Array<{ id: number; reviewerName: string }>>(page, '/api/v1/admin/testimonials').catch(() => [])
    for (const item of testimonials.filter((entry) => [names.testimonial, names.testimonialEdited].includes(entry.reviewerName))) await page.request.delete(`/api/v1/admin/testimonials/${item.id}`)

    const posts = await apiData<Array<{ id: number; title: string }>>(page, '/api/v1/admin/blog').catch(() => [])
    for (const item of posts.filter((entry) => entry.title === names.blog)) await page.request.delete(`/api/v1/admin/blog/${item.id}`)

    if (tour) await page.request.delete(`/api/v1/admin/tours/${tour.id}`)

    const categories = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/categories').catch(() => [])
    for (const item of categories.filter((entry) => entry.name === names.category)) await page.request.delete(`/api/v1/admin/categories/${item.id}`)

    const blogCategories = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/blog-categories').catch(() => [])
    for (const item of blogCategories.filter((entry) => entry.name === names.blogCategory)) await page.request.delete(`/api/v1/admin/blog-categories/${item.id}`)

    const destinations = await apiData<Array<{ id: number; name: string }>>(page, '/api/v1/admin/destinations').catch(() => [])
    for (const item of destinations.filter((entry) => entry.name === names.destination)) await page.request.delete(`/api/v1/admin/destinations/${item.id}`)

    const subscribers = await apiData<Array<{ id: number; email: string }>>(page, '/api/v1/admin/subscribers').catch(() => [])
    for (const item of subscribers.filter((entry) => entry.email === names.subscriber)) await page.request.delete(`/api/v1/admin/subscribers/${item.id}`)

    const documents = await apiData<Array<{ id: number; originalName: string }>>(page, '/api/v1/admin/documents').catch(() => [])
    for (const item of documents.filter((entry) => entry.originalName === names.document)) await page.request.delete(`/api/v1/admin/documents/${item.id}`)
  }
})
