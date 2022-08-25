import UUID4 from "@/js/uuid/uuid4";

const UUID_REG = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;

describe("uuid4.ts", () => {
  it("Test create uuid4", () => {
    for (let i = 0; i < 10; i++) {
      const currentUuid = UUID4.create();
      expect(UUID_REG.test(currentUuid)).toBeTruthy();
    }
  });
});
