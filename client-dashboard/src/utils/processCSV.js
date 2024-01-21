export const countCarTypes = (csvData) => {
    const carTypeCount = {};

    csvData.slice(1).forEach((row) => {
      const carType = row[2]; 
      carTypeCount[carType] = (carTypeCount[carType] || 0) + 1;
    });

    return carTypeCount;
};

export const formatChartData = (csvData) => {
    const carTypeCount = countCarTypes(csvData);
    const chartData = [['CarType', 'Count']];

    Object.entries(carTypeCount).forEach(([carType, count]) => {
        chartData.push([carType, count]);
    });

    return chartData;
};

export const countCarAndTruckTypes = (csvData) => {
    const carTypeCount = { Car: 0, Truck: 0 };

    csvData.slice(1).forEach((row) => {
        const carType = row[2]; 
        const isTruck = carType.toLowerCase().includes('truck');
        
        if (isTruck) {
        carTypeCount.Truck += 1;
        } else {
        carTypeCount.Car += 1;
        }
    });

    return carTypeCount;
};

export const formatCarAndTruckChartData = (csvData) => {
    const carAndTruckCount = countCarAndTruckTypes(csvData);
    const chartData = [['Vehicle Type', 'Count']];

    Object.entries(carAndTruckCount).forEach(([vehicleType, count]) => {
        chartData.push([vehicleType, count]);
    });

    return chartData;
};

const getEndTime = (startTime, carClass) => {
    const servicingInfo = {
        'compact': 30,
        'medium': 30,
        'full-size': 30,
        'class 1 truck': 60,
        'class 2 truck': 120
    };    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + servicingInfo[carClass]);
    return endTime;
}

export const isWalkin = (appointement) => {
    return appointement[0] === appointement[1]
}

export const isOutsideHours = (dateTimeString, additionalMinutes) => {
    const targetDateTime = new Date(dateTimeString);
    targetDateTime.setMinutes(targetDateTime.getMinutes() + additionalMinutes);
    const hours = targetDateTime.getHours();
    const minutes = targetDateTime.getMinutes();
    const seconds = targetDateTime.getSeconds();
    return hours < 7 || hours > 19;
}

export const getProcessingTime = (carType) => {
    const servicingInfo = {
        'compact': 30,
        'medium': 30,
        'full-size': 30,
        'class 1 truck': 60,
        'class 2 truck': 120
    };
    return servicingInfo[carType]
}

export const findFirstBooking = (data) => {
    let oldestItem = data[0];
    let oldestDate = new Date(oldestItem[0]);

    for (let i = 1; i < data.length; i++) {
        const currentDate = new Date(data[i][0]);

        if (currentDate < oldestDate) {
            oldestDate = currentDate;
            oldestItem = data[i];
        }
    }
    return oldestItem;
}

export const processWalkins = (dates) => {
    let count = 0;
    console.log(dates)
    const walkins = { 
        "total":0,
        "compact":[],
        "medium":[],
        "full-size":[],
        "class 1 truck":[],
        "class 2 truck":[]
    };
    const turnaway = {
        "total":0,
        "passed_hours_walkin":[],
        "passed_hours_booking":[],
        "no_availability_walkin":[],
        "no_availability_booking":[]
    }

    const validWalkin = {
        "total":0,
        "compact":[],
        "medium":[],
        "full-size":[],
        "class 1 truck":[],
        "class 2 truck":[]
    }

    const validBooking = {
        "total":0,
        "compact":[],
        "medium":[],
        "full-size":[],
        "class 1 truck":[],
        "class 2 truck":[]
    }

    for (const carType in dates) {
        for (const date in dates[carType]){
            if (dates[carType][date].length == 1){
                const bIsOutsideHours = isOutsideHours(dates[carType][date][0][1],getProcessingTime(carType))
                if (bIsOutsideHours === true) {
                    if (isWalkin(dates[carType][date][0]) === true){
                        turnaway["passed_hours_walkin"].push(dates[carType][date][0]);
                        turnaway["total"]=turnaway["total"]+1
                        walkins[carType].push(dates[carType][date][0]);
                        walkins["total"]=walkins["total"]+1
                        count+=1;
                        continue;
                    }
                    turnaway["passed_hours_booking"].push(dates[carType][date][0])
                    turnaway["total"]=turnaway["total"]+1
                } else {
                    if (isWalkin(dates[carType][date][0]) === true){
                        validWalkin[carType].push(dates[carType][date][0]);
                        validWalkin["total"] = validWalkin["total"]+1
                        walkins[carType].push(dates[carType][date][0]);
                        walkins["total"]=walkins["total"]+1
                        count+=1;
                        continue;
                    }
                    validBooking[carType].push(dates[carType][date][0]);
                    validBooking["total"]=validBooking["total"]+1
                    continue;
                }
            }
            let noOutsideHours = [];
            for (let i = 0; i < dates[carType][date].length; i+=1){
                const bIsOutsideHours = isOutsideHours(dates[carType][date][i][1],getProcessingTime(carType))
                if (bIsOutsideHours === true) {
                    if (isWalkin(dates[carType][date][i]) === true){
                        turnaway["passed_hours_walkin"].push(dates[carType][date][i]);
                        turnaway["total"]=turnaway["total"]+1
                        walkins[carType].push(dates[carType][date][i]);
                        walkins["total"]=walkins["total"]+1
                        count+=1;
                        continue;
                    }
                    turnaway["passed_hours_booking"].push(dates[carType][date][i])
                    turnaway["total"]=turnaway["total"]+1
                    continue;
                } 
                noOutsideHours.push(dates[carType][date][i])
                const appointement = dates[carType][date][i]
                if (isWalkin(dates[carType][date][i]) === true){
                    walkins[carType].push(appointement);
                    walkins["total"]=walkins["total"]+1
                    count += 1
                }
            }
            dates[carType][date] = noOutsideHours;
            if (dates[carType][date].length != 0) { 
                const first = findFirstBooking(dates[carType][date]);
                validBooking[carType].push(first);
                validBooking["total"]=validBooking["total"]+1
                for (let i = 0; i < dates[carType][date].length; i+=1){
                    if (JSON.stringify(first) === JSON.stringify(dates[carType][date][i])) continue;
                    if (isWalkin(dates[carType][date][i])){
                        turnaway["no_availability_walkin"].push(dates[carType][date][i]);
                        turnaway["total"]=turnaway["total"]+1
                    } else {
                        turnaway["no_availability_booking"].push(dates[carType][date][i]);
                        turnaway["total"]=turnaway["total"]+1
                    }
                }
            }
        }
    }
    console.log(dates)
    console.log(turnaway)
    console.log(validWalkin)
    console.log(validBooking)
    console.log(walkins)
    console.log("count " + count)
    return {
        "turnaway":turnaway,
        "validWalkin":validWalkin,
        "validBooking":validBooking,
        "walkins":walkins,
    }
}

export const processRows = (csvData) => {

    csvData.sort((a, b) => {
        const time2A = new Date(a[1]);
        const time2B = new Date(b[1]);
        return time2A - time2B;
    });
    let dates = {
        "compact":{},
        "full-size":{},
        "medium":{},
        "class 2 truck":{},
        "class 1 truck":{}
    };
    for (let i = 1; i < csvData.length; i++) {
        if (csvData[i][1] in dates[csvData[i][2]]){
            let temp = dates[csvData[i][2]][csvData[i][1]]
            temp.push(csvData[i])
            dates[csvData[i][2]][csvData[i][1]] = temp
        } else {
            dates[csvData[i][2]][csvData[i][1]] = [csvData[i]]
        }
    }
    console.log(dates)
    const {turnaway,walkins,validBooking,validWalkin} = processWalkins(dates);
    return {
        "turnaway":turnaway,
        "validWalkin":validWalkin,
        "validBooking":validBooking,
        "walkins":walkins,
        "metadata":{
            "total_entries":csvData.length,
        }
    }
}


export const pagination = (csvData,page) => {
    const itemsPerPage = 50;
    const tempRows = [];
    let startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (startIndex === 0) startIndex+=1;
    for (let i = startIndex; i < endIndex; i+=1){
        tempRows.push(createData(csvData[i][0],csvData[i][1],csvData[i][2]))
    }
    return tempRows;
}

// export const findWalkins = (rows) => {

//     const tempWalkins = []
//     for (let i = 0; i < rows.length; i+=1){
//         requestDate = new Date(rows[i][0]);
//         apntDate = new Date(rows[i][1]);
//         if (requestDate.getTime() === apntDate.getTime()){
//             tempWalkins.push(rows[i])
//         }
//     }
    
//     for (let i = 0; i < rows.length; i+=1){
        
//     }

//     return tempWalkins;
// }

export const createData = (call_date, apnt_date, car_type)  => ({ call_date, apnt_date, car_type });


