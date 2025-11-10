const { errorResponder, errors } = require('../../../core/errors');
const repository = require('./repository');

const TIME_CHECKING_REGEX = /^(2[1-4]|(1|0)[0-9]):[0-5][0-9]-(2[1-4]|(1|0)[0-9]):[0-5][0-9]$/

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
    currentList[id] = phone;
    const newString = currentList.join("&&");
    await repository.updatePhoneNumber(newString);
}

async function deletePhone(id) {
    const current = await repository.getCurrentPhoneString();
    const currentList = current.split("&&");
    currentList.splice(id, 1);
    const newString = currentList.join("&&");
    await repository.updatePhoneNumber(newString);
}

async function addEmail(number) {
    const current = await repository.getCurrentEmailString();
    const currentList = current.split("&&");
    currentList.push(number);
    const newString = currentList.join("&&");
    await repository.updateEmail(newString);
}

async function changeEmail(email, id) {
    const current = await repository.getCurrentEmailString();
    const currentList = current.split("&&");
    currentList[id] = email;
    const newString = currentList.join("&&");
    await repository.updateEmail(newString);
}

async function deleteEmail(id) {
    const current = await repository.getCurrentEmailString();
    const currentList = current.split("&&");
    currentList.splice(id, 1);
    const newString = currentList.join("&&");
    await repository.updateEmail(newString);
}

async function changeSchedule(newSchedule) {
    const current = await repository.getCurrentScheduleString();
    const processing = current.split("&&");
    let schedulesObject = {};
    for (const i of processing) {
        let splitString = i.split("\\");
        schedulesObject[splitString[0]] = splitString[1];
    }

    for (const key in schedulesObject) {
        if (newSchedule[key]) if ((TIME_CHECKING_REGEX.test(newSchedule[key]) && newSchedule[key].length <= 11) || newSchedule[key].toLowerCase().trim() == "closed") {
            schedulesObject[key] = newSchedule[key].toUpperCase();
        }
    }
    let finalString = "";
    for (const key in schedulesObject) {
        finalString += `&&${key}\\${schedulesObject[key]}`;
    }

    finalString = finalString.slice(2);

    await repository.updateSchedule(finalString);
    return;
}


module.exports = {
    getContactsData,
    addPhone,
    changePhone,
    deletePhone,
    addEmail,
    changeEmail,
    deleteEmail,
    changeSchedule,
};