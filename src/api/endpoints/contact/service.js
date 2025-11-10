const { errorResponder, errors } = require('../../../core/errors');
const repository = require('./repository');

async function getContactsData() {
    const result = await repository.getContactsData();
    const rows = result.rows;

    //Pre Processing
    let keyvals = {
        addresses: rows.find(obj => obj.attribute == "contacts_addresses").value,
        schedules: rows.find(obj => obj.attribute == "contacts_schedules").value,
        phoneNumbers: rows.find(obj => obj.attribute == "contacts_phone_numbers").value,
        emails: rows.find(obj => obj.attribute == "contacts_emails").value,
    };

    let processing;

    //Process addresses
    processing = keyvals.addresses.split("&&");
    let addressesArray = processing.map((str, i) => {
        let splitString = str.split("\\");
        return { name: splitString[0], address: splitString[1] };
    });

    //Process schedules
    processing = keyvals.schedules.split("&&");
    let schedulesObject = {};
    for (const i of processing) {
        let splitString = i.split("\\");
        schedulesObject[splitString[0]] = splitString[1];
    }

    //Process phoneNumbers
    let phoneNumbersArray = keyvals.phoneNumbers.split("&&");

    //Process emails
    let emailsArray = keyvals.emails.split("&&");

    let data = {
        addresses: addressesArray,
        schedule: schedulesObject,
        phoneNumbers: phoneNumbersArray,
        emails: emailsArray,
    };
    return data;
}

async function addPhone(number) {
    const current = await repository.getCurrentPhoneString();
    const currentList = current.split("&&");
    currentList.push(number);
    const newString = currentList.join("&&");
    await repository.updatePhoneNumber(newString);
}

async function changePhone(phone, id) {
    const current = await repository.getCurrentPhoneString();
    const currentList = current.split("&&");
    console.log(id);
    currentList[id] = phone;
    const newString = currentList.join("&&");
    await repository.updatePhoneNumber(newString);
}

module.exports = {
    getContactsData,
    addPhone,
    changePhone,
};