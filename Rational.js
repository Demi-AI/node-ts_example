/*
程式說明：
1. `Rational` 類別:
   - 這個類別管理有理數（分數），提供了分子和分母的存取方法。
   - `normalize()` 方法負責將分數化簡。
   - `isWhole()` 和 `isDecimal()` 用來檢查分數是否為整數或小數。
   - `equals()` 方法比較分數是否相等，`equalsRational()` 用來比較兩個 `Rational` 物件是否相等。
   - 提供靜態方法 `parseRational` 和 `parseRationalString` 來解析字元陣列和字串格式的分數。
2. 測試程式:
   - 創建兩個 `Rational` 物件進行測試，檢查是否能正確執行分數的化簡、比較和解析功能。
*/
// Rational 類別
var Rational = /** @class */ (function () {
    // 建構子，接受指定的分子和分母
    function Rational(numerator, denominator) {
        if (denominator === 0) {
            throw new Error("分母不能為零");
        }
        this.numerator = numerator;
        this.denominator = denominator;
    }
    // 返回分子
    Rational.prototype.getNumerator = function () {
        return this.numerator;
    };
    // 返回分母
    Rational.prototype.getDenominator = function () {
        return this.denominator;
    };
    // 將分數正規化（化簡）並返回新的 Rational 物件
    Rational.prototype.normalize = function () {
        var gcd = this.gcd(this.numerator, this.denominator);
        var newNumerator = this.numerator / gcd;
        var newDenominator = this.denominator / gcd;
        // 確保返回的 Rational 物件的分子不再能被分母整除
        return new Rational(newNumerator % newDenominator, newDenominator);
    };
    // 判斷是否為整數
    Rational.prototype.isWhole = function () {
        return this.numerator % this.denominator === 0;
    };
    // 判斷是否為小數
    Rational.prototype.isDecimal = function () {
        return this.numerator % this.denominator !== 0;
    };
    // 判斷兩個分數是否相等
    Rational.prototype.equals = function (numerator, denominator) {
        var thisNormalized = this.normalize();
        var otherNormalized = new Rational(numerator, denominator).normalize();
        return thisNormalized.getNumerator() === otherNormalized.getNumerator() &&
            thisNormalized.getDenominator() === otherNormalized.getDenominator();
    };
    // 判斷兩個 Rational 物件是否相等
    Rational.prototype.equalsRational = function (r) {
        return this.equals(r.getNumerator(), r.getDenominator());
    };
    // 解析兩個字元陣列為 Rational 物件
    Rational.parseRational = function (charsNumerator, charsDenominator) {
        var num = parseInt(charsNumerator.join(''));
        var den = parseInt(charsDenominator.join(''));
        return new Rational(num, den);
    };
    // 解析字串格式為 "numerator/denominator" 的 Rational 物件
    Rational.parseRationalString = function (rationalString) {
        var _a = rationalString.split('/'), numStr = _a[0], denStr = _a[1];
        return new Rational(parseInt(numStr), parseInt(denStr));
    };
    // 計算兩個數字的最大公因數（GCD）
    Rational.prototype.gcd = function (a, b) {
        if (b === 0) {
            return a;
        }
        return this.gcd(b, a % b);
    };
    return Rational;
}());
// 測試程式碼
var r1 = new Rational(4, 8);
var r2 = new Rational(2, 4);
// 測試 normalize
var normalizedR1 = r1.normalize();
console.log("r1 \u6A19\u6E96\u5316: ".concat(normalizedR1.getNumerator(), "/").concat(normalizedR1.getDenominator()));
// 測試 isWhole
console.log("r1 \u662F\u5426\u70BA\u6574\u6578: ".concat(r1.isWhole()));
// 測試 isDecimal
console.log("r1 \u662F\u5426\u70BA\u5C0F\u6578: ".concat(r1.isDecimal()));
// 測試 equals
console.log("r1 \u8207 r2 \u662F\u5426\u76F8\u7B49: ".concat(r1.equalsRational(r2)));
// 測試 parseRationalString
var r3 = Rational.parseRationalString("6/9");
console.log("r3 \u7684\u503C: ".concat(r3.getNumerator(), "/").concat(r3.getDenominator()));
