const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partition key itself when gived a valid parition key", () => {
    const input = {
      partitionKey: "kfwopejgoiewjgijigj",
    };
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toBe(input.partitionKey);
  });

  it("Returns a 128 character hash when given a partion key string that's longer that the max length", () => {
    const input = {
      partitionKey: mockString384,
    };
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey.length).toBe(128);
  });

  it("Returns a 128 character hash when given a falsy partition key", () => {
    var trivialKey = deterministicPartitionKey({
      partitionKey: 0,
    });
    expect(trivialKey.length).toBe(128);

    trivialKey = deterministicPartitionKey({
      partitionKey: undefined,
    });
    expect(trivialKey.length).toBe(128);

    trivialKey = deterministicPartitionKey({
      partitionKey: null,
    });
    expect(trivialKey.length).toBe(128);
  });

  it("Returns the stringified trivialKey value when passed a truthy trivialKey value who's length when strified is less than the max key length", () => {
    var trivialKey = deterministicPartitionKey({
      partitionKey: [],
    });
    expect(trivialKey.length).toBe(2);
    const mockPartitionKey = {
      key: "value",
    };
    trivialKey = deterministicPartitionKey({
      partitionKey: mockPartitionKey,
    });
    expect(trivialKey.length).toBe(JSON.stringify(mockPartitionKey).length);
  });
});

const mockString384 =
  "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862";
