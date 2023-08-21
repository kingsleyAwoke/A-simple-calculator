const getHistory = () => {
    return document.getElementById("history_value").innerText;
}

const printHistory = num => {
    document.getElementById("history_value").innerText = num;
}

const getOutput = () => {
    return document.getElementById("output_value").innerText;
}

const printOutput = num => {
    if (num == "") {
        document.getElementById("output_value").innerText = num;
    } else {
        document.getElementById("output_value").innerText = getFormattedNumber(num);
    }
    
}

const getFormattedNumber = num => {
    if  (num == "-") {
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");

    return value;
}

const revserNumberFormat = num => {
    return Number(num.replace(/,/g, ''));
}

let operator = document.getElementsByClassName("operator");

for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        }
        else if (this.id == "backspace") {
            let output = revserNumberFormat(getOutput()).toString();

            if (output) {
                output = output.slice(0, output.length - 1);
                printOutput(output);
            }
        } else {
            let output = getOutput();
            let history = getHistory();
            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.slice(0, history.length - 1);
                }
            }
            if (output != "" || history != "") {
                output = output == ""? output:revserNumberFormat(output);
                history += output;

                if (this.id == "=") {
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else {
                    history += this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

let number = document.getElementsByClassName("number");

for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        let output = revserNumberFormat(getOutput());

        if (output != NaN) {
            output += this.id;
            printOutput(output);
        }
    });
}