const router = require("express").Router();

const {
  updateMerchantGroups,
  updateMerchantApi,
  removeGroup,
  updateGroupsItems,
  updateProfileImage
} = require("../Controllers/crud.controllers");

router.put("/apiv1/merchant/:id", updateMerchantApi);
router.put("/apiv1/profile-image/:id", updateProfileImage);
router.put("/apiv1/groups/:id", updateMerchantGroups);
router.put("/apiv1/remove-groups/:id", removeGroup);
router.put("/apiv1/update-groups/:id", updateGroupsItems);

module.exports = router;
