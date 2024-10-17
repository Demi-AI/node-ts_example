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
class Rational {
    private numerator: number; // 分子
    private denominator: number; // 分母

    // 建構子，接受指定的分子和分母
    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("分母不能為零");
        }
        this.numerator = numerator;
        this.denominator = denominator;
    }

    // 返回分子
    getNumerator(): number {
        return this.numerator;
    }

    // 返回分母
    getDenominator(): number {
        return this.denominator;
    }

    // 將分數正規化（化簡）並返回新的 Rational 物件
    normalize(): Rational {
        const gcd = this.gcd(this.numerator, this.denominator);
        const newNumerator = this.numerator / gcd;
        const newDenominator = this.denominator / gcd;

        // 確保返回的 Rational 物件的分子不再能被分母整除
        return new Rational(newNumerator % newDenominator, newDenominator);
    }

    // 判斷是否為整數
    isWhole(): boolean {
        return this.numerator % this.denominator === 0;
    }

    // 判斷是否為小數
    isDecimal(): boolean {
        return this.numerator % this.denominator !== 0;
    }

    // 判斷兩個分數是否相等
    equals(numerator: number, denominator: number): boolean {
        const thisNormalized = this.normalize();
        const otherNormalized = new Rational(numerator, denominator).normalize();
        return thisNormalized.getNumerator() === otherNormalized.getNumerator() &&
            thisNormalized.getDenominator() === otherNormalized.getDenominator();
    }

    // 判斷兩個 Rational 物件是否相等
    equalsRational(r: Rational): boolean {
        return this.equals(r.getNumerator(), r.getDenominator());
    }

    // 解析兩個字元陣列為 Rational 物件
    static parseRational(charsNumerator: string[], charsDenominator: string[]): Rational {
        const num = parseInt(charsNumerator.join(''));
        const den = parseInt(charsDenominator.join(''));
        return new Rational(num, den);
    }

    // 解析字串格式為 "numerator/denominator" 的 Rational 物件
    static parseRationalString(rationalString: string): Rational {
        const [numStr, denStr] = rationalString.split('/');
        return new Rational(parseInt(numStr), parseInt(denStr));
    }

    // 計算兩個數字的最大公因數（GCD）
    private gcd(a: number, b: number): number {
        if (b === 0) {
            return a;
        }
        return this.gcd(b, a % b);
    }
}

// 測試程式碼
const r1 = new Rational(4, 8);
const r2 = new Rational(2, 4);

// 測試 normalize
console.log(`r1 標準化: ${r1.normalize().getNumerator()}/${r1.normalize().getDenominator()}`);

// 測試 isWhole
console.log(`r1 是否為整數: ${r1.isWhole()}`);

// 測試 isDecimal
console.log(`r1 是否為小數: ${r1.isDecimal()}`);

// 測試 equals
console.log(`r1 與 r2 是否相等: ${r1.equalsRational(r2)}`);

// 測試 parseRationalString
const r3 = Rational.parseRationalString("6/9");
console.log(`r3 的值: ${r3.getNumerator()}/${r3.getDenominator()}`);
