import { authRole } from "@crema/constants/AppConst";

export const getUserFromAuth0 = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.sub,
      displayName: user.name,
      email: user.email,
      photoURL: user.picture,
      role: authRole.User,
    };
  return user;
};

export const getUserFromFirebase = (user) => {
  if (user)
    return {
      id: user._id,
      uid: user._id,
      displayName: user.name ? user.name : "Crema User",
      email: user.email,
      photoURL: user.photoURL
        ? user.photoURL
        : "/assets/images/avatar/user.png",
      role: user.role,
      subscriptionPlan: user.subscriptionPlan || 0
    };
  return user;
};

export const getUserFromAWS = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.username,
      displayName: user.attributes.name ? user.attributes.name : "Crema User",
      email: user.attributes.email,
      photoURL: user.photoURL,
      role: authRole.User,
    };
  return user;
};

export const getUserFromJwtAuth = (user) => {
  if (user)
    return {
      id: 1,
      uid: user._id,
      displayName: user.name,
      email: user.email,
      photoURL: user.avatar,
      role: authRole.User,
    };
  return user;
};
