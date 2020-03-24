import WorkedHours from '../components/Worked-hours/WorkedHoursComponent'

jest.mock('tns-core-modules/application', () => ({
    android: {
      on: jest.fn()
    },
    AndroidApplication: {
      activityBackPressedEvent: {}
    }
  }));



describe('WorkedHours tests', () => {

    it('Should properly convert data to string', async () => {
        const date = "2019-12-18";
        await expect(WorkedHours.methods.convertDateToString(date)).toEqual('wo 18 december 2019');
    })
})
