class RealCalculator {
    add(a, b) {
        return a + b;
    }
    
    sub(a, b){
        return a - b;
    }

    mult(a, b){
        return a * b;
    }


    div(a, b){
        if(b != 0){
            return a / b;
        }
    }

    pow(a, n){
        return Math.pow(a,n);
    }

    prod(a, p){
        return a * p;
    }

    zero() {
        return 0;
    }

    one() {
        return 1;
    }
}