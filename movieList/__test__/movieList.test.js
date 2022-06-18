const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
  await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
  await driver.quit()
})

 const testMovie = 'Dune';
 const testMovie2 = 'The Goonies'

test('add a movie to list', async () => {
  await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys(testMovie);
  await driver.findElement(By.xpath('//button[text()="Add"]')).click();
  const movie = await driver.findElement(By.xpath('//span[text()="Dune"]'));
  const isDisplayed = await movie.isDisplayed();
  expect(isDisplayed).toBeTruthy();
})

test('delete a movie added to list', async () => {
  await driver.findElement(By.xpath(`//button[@id="${testMovie}"]`)).click();
  const movie = await driver.findElements(By.xpath('//span[text()="Dune"]'))
  expect(movie.length).toBe(0);
})

test('cross of a movie as watched', async () => {
  await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys(testMovie);
  await driver.findElement(By.xpath('//button[text()="Add"]')).click();
  await driver.findElement(By.xpath(`//span[text()="${testMovie}"]`)).click();
  const checkedMovie = await driver.findElement(By.xpath('//span[@class="checked"]'));
  const displayChecked = await checkedMovie.isDisplayed()
  expect(displayChecked).toBeTruthy();
})

test('uncross a movie as watched', async () => {
  await driver.findElement(By.xpath('//input[@placeholder="Add Movie"]')).sendKeys(testMovie2);
  await driver.findElement(By.xpath('//button[text()="Add"]')).click();
  await driver.findElement(By.xpath(`//span[text()="${testMovie2}"]`)).click();
  const checkedMovie = await driver.findElement(By.xpath(`//aside[text()="${testMovie2} watched!"]`)).isDisplayed();
  expect(checkedMovie).toBeTruthy();
})