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

    // 使用 Xpath 去定位按鈕、輸入框的位置
    .useXpath()

    // Login in 頁面
    .setValue('//*[@id="email"]', 'admin')
    .setValue('//*[@id="password"]', 'free5gc')
    .click('//*[@id="root"]/main/div/form/button')
    .click('//*[@id="root"]/div/div/div/nav/a[2]/div/div[2]/span')
    .click('//*[@id="root"]/div/main/div[2]/div/div/div/div/button')
    .pause(1000)

    // 修改 SUPI
    .setValue('//*[@id=":r4:"]', backspaces)
    .setValue('//*[@id=":r4:"]', '208930000007487')
    .pause(1000)

    // 修改 MSISDN
    .setValue('//*[@id=":r5:"]', '0917494749')
    .pause(1000)
    
    // 在 DNN 為 internet 裡面按下 +FLOW RULE
    .click("//*[contains(text(),'+FLOW RULE')]")
    .pause(1000)

    // 按下 Create
    .click('//*[@id="root"]/div/main/div[2]/div/div/div/div[6]/button')
    .pause(1000)
  
    // 確認是否有 imsi-208930000007487 這個 UE 的 table row
    .isVisible("//tr[td[text()='imsi-208930000007487']]", result => {
        browser.assert.equal(result.value, 1)
    })
    .pause(1000)

    // Delete UE by SUPI
    .click("//tr[td[text()='imsi-208930000007487']]/td[3]/button")
    .pause(1000)

    // 按下彈出式視窗的「確認」
    .acceptAlert()
    .pause(10000)

    .end()
  },
};

export default home;
