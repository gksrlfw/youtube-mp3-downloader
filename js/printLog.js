// print log that is shown what percent completed

const printLog = (percent, title, artist, cnt) => {
    const printLog = document.querySelector('#print_log');
    printLog.scrollTop = printLog.scrollHeight;
    if(!cnt) printLog.innerHTML += `========= ${title} : ${artist} Download =========<br>`;
    // percent.forEach(element => {
    //     let str = `Compeleted ${Math.floor(element)}%  !!!<br>`;
    //     printLog.innerHTML += str;
    // });
    if(percent.length && Math.floor(percent[percent.length-1]) !== 0) printLog.innerHTML += `Completed ${Math.floor(percent[percent.length-1])}% ~~~<br>`
    if(cnt === -1) {
        printLog.innerHTML += 
        `Everything is done !!!<br>
        ========= ${title} : ${artist} Completed =========<br>`;
    }
}

module.exports = printLog;

