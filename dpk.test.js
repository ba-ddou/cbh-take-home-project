const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the partition key itself when passed a valid parition key", () => {
    const input = {
      partitionKey: "kfwopejgoiewjgijigj",
    };
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toBe(input.partitionKey);
  });
});
