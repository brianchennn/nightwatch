import { NightwatchAPI, NightwatchTests } from 'nightwatch';

const home: NightwatchTests = {
  'Webconsle title test': () => {
    var backspaces = []
    for (let i = 0; i < 100; i++) {
      backspaces.push('\u0008')
    }

    const IMSIPrefix = 'imsi-'
    const SUPI = '208930000007487'
    const MSISDN = '0917494749'
    const XPathSUPI = '//*[@id="SUPI (IMSI)"]//tr/td/div/div/input'
    const XPathMSISDN = '//*[@id="MSISDN"]//tr/td/div/div/input'
    const dnn1 = 'internet'
    const dnn2 = 'IMS'
    const snssai1 = '01010203'
    const snssai2 = '01112233'
    const qosRef1 = '1'
    const qosRef2 = '2'
    const qosRef3 = '3'
    const waitTime = 100 //ms

    browser
      .url('http://10.10.0.83:5000').waitForElementVisible('body', waitTime)
      .assert.titleEquals('free5GC Web Console')

      // 使用 Xpath 去定位按鈕、輸入框的位置
      .useXpath()

      // Login in 頁面
      .setValue('//*[@id="email"]', 'admin')
      .setValue('//*[@id="password"]', 'free5gc')
      .click('//*[@id="root"]/main/div/form/button')
      .click('//*[@id="root"]/div/div/div/nav/a[2]/div/div[2]/span')
      .click('//*[@id="root"]/div/main/div[2]/div/div/div/div/button')
      .pause(waitTime)

      // 修改 SUPI
      .setValue(XPathSUPI, backspaces)
      .setValue(XPathSUPI, SUPI)
      .pause(waitTime)


      // 修改 MSISDN
      .setValue(XPathMSISDN, MSISDN)
      .pause(waitTime)

      // 在 DNN 為 internet 裡面按下 +FLOW RULE
      .click('//*[@id="' + snssai1 + '-' + dnn1 + '-AddFlowRuleArea"]/button')
      .pause(waitTime)

      // 修改 Flow Rule 1
      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef1 + '-IpFilter"]/tr/td/div/div/input', backspaces)
      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef1 + '-IpFilter"]/tr/td/div/div/input', "permit out ip from any to 10.60.0.1")
      .pause(waitTime)

      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef1 + '-Precedence"]/tr/td/div/div/input', backspaces)
      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef1 + '-Precedence"]/tr/td/div/div/input', "121")
      .pause(waitTime)

      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef1 + '-5QI"]/tr/td/div/div/input', backspaces)
      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef1 + '-5QI"]/tr/td/div/div/input', "11")
      .pause(waitTime)

      // 修改 Flow Rule 3
      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef3 + '-IpFilter"]/tr/td/div/div/input', backspaces)
      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef3 + '-IpFilter"]/tr/td/div/div/input', "permit out ip from any to 10.60.0.2")
      .pause(waitTime)

      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef3 + '-Precedence"]/tr/td/div/div/input', backspaces)
      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef3 + '-Precedence"]/tr/td/div/div/input', "123")
      .pause(waitTime)

      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef3 + '-5QI"]/tr/td/div/div/input', backspaces)
      .setValue('//*[@id="' + snssai1 + '-' + dnn1 + '-' + qosRef3 + '-5QI"]/tr/td/div/div/input', "13")
      .pause(waitTime)

      // 在 snssai1 新增 dnn2 = IMS 
      //*[@id="01010203-AddDNN"]/div/div/div
      .setValue('//*[@id="' + snssai1 + '-AddDNNInputArea"]/div/div/div/input', dnn2)
      //*[@id="01112233-AddDNNButtonArea"]/div/button
      .click('//*[@id="' + snssai1 + '-AddDNNButtonArea"]/div/button')
      .pause(waitTime)

      // 按下 Create
      .click('//*[@id="root"]/div/main/div[2]/div/div/div/div[6]/button')
      .pause(waitTime)

      // 確認是否有 imsi-208930000007487 這個 UE 的 table row
      .isVisible('//tr[td[text()="' + IMSIPrefix + SUPI + '"]]', result => {
        browser.assert.equal(result.value, 1)
      })
      .pause(waitTime)

      // 按下 VIEW
      .click('//tr[td[text()="' + IMSIPrefix + SUPI + '"]]//td[button[text()="VIEW"]]/button')
      .pause(waitTime)

      
      // 確認 UE info 正確
      .getText('//tr[td[text()="SUPI (IMSI)"]]/td[2]', result => {
        browser.assert.equal(result.value, SUPI)
      })
      .getText('//tr[td[text()="MSISDN"]]/td[2]', result => {
        browser.assert.equal(result.value, MSISDN)
      })
      .pause(waitTime)

      // 回到 SubscriberList
      .click('//*[@id="root"]/div/div/div/nav/a[2]/div/div[2]/span')
      .pause(waitTime)

      // 刪除 UE
      .click('//tr[td[text()="' + IMSIPrefix + SUPI + '"]]/td[3]/button')
      .pause(waitTime)

      // 按下彈出式視窗的「確認」
      .acceptAlert()
      .pause(waitTime)

      .end()
  },
};

export default home;
