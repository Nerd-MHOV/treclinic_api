export async function Sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
