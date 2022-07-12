const crypto = require("crypto");
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";

  if (!event) return TRIVIAL_PARTITION_KEY;
  if (event.partitionKey) return amendPartitionKey(event.partitionKey);
  else return hash(event);
};

const amendPartitionKey = (candidate) => {
  const input =
    typeof candidate === "string" ? candidate : JSON.stringify(candidate);
  if (input.length <= MAX_PARTITION_KEY_LENGTH) return input;
  else return hash(input);
};

const hash = (data) => {
  const input = typeof data === "string" ? data : JSON.stringify(data);
  return crypto.createHash("sha3-512").update(input).digest("hex");
};
