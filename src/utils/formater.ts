export function formatCurrency(valueNumber:number) {
    return new Intl.NumberFormat('id-ID').format(valueNumber);
}