import { getApiCall } from "apiServices/apiUtils";
import { MENU_LIST } from "types/actions/MenuAction";
import { ORIGINAL_MENU_LIST } from "types/actions/MenuAction";
import MenuImageDirectory from "@uikit/common/Menu/MenuImageRepo";

const _generateMenuIcon = (iconName) => {
  var iconNode = MenuImageDirectory?.find(
    (item) => item?.iconName === iconName
  );
  return (iconNode && iconNode?.iconNode) || null;
};

export const setUserMenuList = (payload: any) => ({
  type: MENU_LIST,
  payload,
});

export const setUserMenuOriginalList = (payload: any) => ({
  type: ORIGINAL_MENU_LIST,
  payload,
});

const handleMenuOperations = (menu) => {
  const MainMenu = menu.filter((i) => i?.isparent === 1);
   let Array = MainMenu.map((item, ind) => {
    let SubMenu = menu.filter(
      (i) => i?.isparent === 0 && i?.parentName === item?.menuName
    );
    return {
      id: item?.id,
      title: item?.menuName,
      messageId: `${item?.menuName}_${ind}`,
      exact: false,
      type: "collapse",
      icon: item?.icons,
      url: item?.menuRoute,
      sequence: item?.sequence,
      children: SubMenu.map((i) => {
        return {
          id: i?.id,
          title: i?.menuName,
          type: "item",
          icon: i?.icons,
          url: i?.menuRoute,
        };
      }),
    };
  });
  // const additionalElement = {
  //   id: "Roles",
  //   title: "SCM",
  //   messageId: "Home1",
  //   apiType: "",
  //   exact: false,
  //   type: "collapse",
  //   icon: "",
  //   url: "#",
  //   children: [
  //     {
  //       id: "Master",
  //       title: "SCM",
  //       type: "item",
  //       icon: "",
  //       url: "/scm",
  //     },
     
  //   ],
   
  // }
  //Array.push(additionalElement)
return Array;
 
};

export const getMenuList = () => {
  return (dispatch) => {
    getApiCall(`${process.env.REACT_APP_BASE_EXTENTION}/api/Role/GetDetailsByRoleName`).then(
      (response) => {
        if(response?.status && response?.code === 200 && response?.data){
          const orderedMenuList = response.data.sort((a, b) => a.sequence - b.sequence)
          dispatch(setUserMenuList(handleMenuOperations(orderedMenuList)));
          dispatch(setUserMenuOriginalList(response || []));
        }
      }
    );
  };
};
