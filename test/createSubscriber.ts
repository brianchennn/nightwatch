import {NightwatchAPI, NightwatchTests} from 'nightwatch';

const home: NightwatchTests = {
  'Webconsle title test': () => {
    var backspaces = []
    for (let i = 0 ; i < 100 ; i++) {
      backspaces.push('\u0008')
    }
    browser
    .url('http://10.10.0.83:5000').waitForElementVisible('body', 1000)
    .assert.titleEquals('free5GC Web Console')

    .useXpath()

    .setValue('//*[@id="email"]', 'admin')
    .setValue('//*[@id="password"]', 'free5gc')
    .click('//*[@id="root"]/main/div/form/button')
    .click('//*[@id="root"]/div/div/div/nav/a[2]/div/div[2]/span')
    .click('//*[@id="root"]/div/main/div[2]/div/div/div/div/button')
    .pause(1000)

    .setValue('//*[@id=":r4:"]', backspaces)
    .setValue('//*[@id=":r4:"]', '208930000007487')
    .pause(1000)

    .setValue('//*[@id=":r5:"]', '0917494749')
    .pause(1000)
    
    .click('//*[@id="root"]/div/main/div[2]/div/div/div/div[6]/button')
    .pause(1000)
  
    .isVisible("//tr[td[text()='imsi-208930000007487']]", result => {
        browser.assert.equal(result.value, 1)
    })
    .pause(1000)
    .click("//tr[td[text()='imsi-208930000007487']]/td[3]/button")
    .acceptAlert()
    .pause(20000)
    .end()
  },
};

export default home;
