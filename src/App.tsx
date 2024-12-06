import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Input from "./components/input";

import type { DropEvent } from "@mirohq/websdk-types";

const { board } = miro;

function App() {
  // Raw URLs as a single string
  const rawUrls = `
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4cf0323b-25b4-4f81-96eb-d2e277461b5a/ZK_buttons_library-blue_16.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/bb0cdbc9-08c6-4180-a293-42008e079c78/ZK_buttons_library-blue_18.png?content-type=image%2Fpng
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/994fbf8b-880e-4ec8-910d-16adcf5ef99d/ZK_buttons_library-blue_20.png?content-type=image%2Fpng
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/7a254da1-5e9b-4c77-9b0c-8cf7307ed2bb/ZK_buttons_library-blue_22.png?content-type=image%2Fpng
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/5a7d422a-59d1-4b3e-adac-b374dbee5142/ZK_buttons_library-blue_19.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/abf38076-0822-4b0d-8fac-329954740204/ZK_buttons_library-blue_21.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d3a8cb8a-01fb-4750-a296-28602ce77f4c/ZK_buttons_library-blue_15.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/6e58b3bb-9505-4501-b79f-95b209da3b2b/ZK_buttons_library-blue_1.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f8419aec-b870-4a39-a061-7e48b512f995/ZK_buttons_library-blue_14.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/59baae1c-b4c6-48aa-8dac-1d82c25f1d6d/ZK_buttons_library-blue_13.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/b3d5d31a-690b-420c-ae8e-f656aa99f21d/ZK_buttons_library-blue_9.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/5ead3070-8b71-4c9f-aa9b-c7be1afe3fcd/ZK_buttons_library-blue_12.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/1180bdf2-7f8f-463f-b236-79d6e408712f/ZK_buttons_library-blue_11.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4208fdbc-f114-40d1-b7eb-e29394a1c5e3/ZK_buttons_library-blue_3.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/6466bb13-b578-4f12-b953-f768c104598e/ZK_buttons_library-blue_2.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/41ce7b6c-ea89-48e3-aed0-425b716be27a/ZK_buttons_library-blue_7.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4f268ddd-9f87-4d5e-ac6c-13044617ad49/ZK_buttons_library-blue_17.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/a15e9742-c2ae-4889-8e96-f1249509de8c/ZK_buttons_library-blue_10.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/407b426a-eb29-422f-b524-33721a4ee112/ZK_buttons_library-blue_8.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e9750fab-7a04-457e-af05-f2f3a2f4f5db/ZK_buttons_library-blue_4.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/daddbf2c-ba17-4072-99a8-474a96e80630/ZK_buttons_library-blue_5.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d4847df2-19e3-405d-b62f-6b17eed97d5a/ZK_buttons_library-blue_6.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/cf690cb1-fb46-4825-b589-75fda9d91590/ZK_buttons_library-white_12.png?content-type=image%2Fpng
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/8c92fb14-e4dc-4775-acac-444f38821e8b/ZK_buttons_library-white_15.png?content-type=image%2Fpng
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/7300c61a-64de-41ba-b9fd-48dbcdf3b922/ZK_buttons_library-white_17.png?content-type=image%2Fpng
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/fda09d44-9dd7-4b6a-87c9-ff3c7a8db87b/ZK_buttons_library-white_18.png?content-type=image%2Fpng
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/bd865cea-92d5-41b2-a4ba-6a75718025e9/ZK_buttons_library-white_14.png?content-type=image%2Fpng
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/dcf8a094-f924-465d-b8b4-3a77c96a1ae6/ZK_buttons_library-white_13.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/19b61c63-1400-4f67-b3e2-5ad57f588d50/ZK_buttons_library-white_9.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/2766d690-ad67-477c-b827-f1126ddd2a52/ZK_buttons_library-white_21.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/9ae0d9be-5726-4fa2-9e56-f0d437cb653c/ZK_buttons_library-white_22.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/1e84459f-b9ad-4d2c-8c0c-aa3d313aedfe/ZK_buttons_library-white_20.png?content-type=image%2Fpng
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/a40db323-64b3-4231-b025-995f62fb04cc/ZK_buttons_library-white_6.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/3647be45-80d9-4f1a-8b1f-da449aa55269/ZK_buttons_library-white_11.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/82ad7884-6eac-44b1-af01-ecaf4c1ac856/ZK_buttons_library-white_1.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/0d6d0304-9fd2-46ba-a6f7-a44a88c2c3f2/ZK_buttons_library-white_16.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4fa6ee0a-8250-426a-9dea-61925022ab8a/ZK_buttons_library-white_5.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/76984585-55b2-4052-8e07-5d53bd8e884f/ZK_buttons_library-white_4.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/0d4fa2f3-d5bc-459a-87f5-df5139b2a25f/ZK_buttons_library-white_10.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/630661f6-6a97-4f45-9899-a90057763989/ZK_buttons_library-white_7.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/2a73868b-b500-4b01-910f-058df111c89e/ZK_buttons_library-white_8.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/0584c5c0-11c0-406a-9e4a-1399cf35c8a2/ZK_buttons_library-white_2.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/3262135b-493b-4111-93eb-be2b757ce0cc/ZK_buttons_library-white_3.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d48ff459-69e8-4c4e-b687-38fd78724431/ZK_buttons_library-black_19.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/14372105-3020-4bc5-89f1-94a9765bcdff/ZK_buttons_library-black_20.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/3374c595-94cd-4162-9068-9250921593cb/ZK_buttons_library-black_18.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/1211586d-5fe0-47f0-96db-7348983774d0/ZK_buttons_library-black_13.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/bdfeb6de-206d-4e7c-ba58-f2761a9e176e/ZK_buttons_library-black_15.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/5b6d224b-e749-4b52-96dc-e4c2034bee4d/ZK_buttons_library-black_14.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/24016540-4757-456d-8c97-a1dd2d9457a4/ZK_buttons_library-black_21.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/9c8fcc3b-c883-4f36-8f6f-1678b9cc8aa7/ZK_buttons_library-black_11.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/bd8037ce-968d-4f4c-a284-46af7cb566ee/ZK_buttons_library-black_16.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/2c5efc77-8f6e-42c9-a93c-c867881bc2b5/ZK_buttons_library-black_17.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/1f064152-7031-4ea7-a731-93b56e3d5f1b/ZK_buttons_library-black_3.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/3c6209a3-38d3-416d-a997-aa36e3161773/ZK_buttons_library-black_4.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/6be52445-d82e-4fa8-932c-e8610b2f2dd5/ZK_buttons_library-black_5.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/20fd69f1-1ba1-4ff8-afbd-a1ab10f6dc02/ZK_buttons_library-black_1.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f42488c0-bde9-42a7-9db2-0992be579876/ZK_buttons_library-black_12.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d2d6faaa-6382-4684-9d05-735f6e79a7d3/ZK_buttons_library-black_7.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/42af298e-0011-4fcb-8e42-9d4363815999/ZK_buttons_library-black_2.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/b4083197-acb7-4823-8d51-edd3fb209838/ZK_buttons_library-black_8.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/2fcb14fe-21d7-445e-9340-cd5bc7a083e2/ZK_buttons_library-black_10.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/b707b352-539f-4300-b1b1-5fd0a48c0391/ZK_buttons_library-black_9.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/ffc72cd5-7f37-40a3-a73a-ceb1015557b7/ZK_buttons_library-black_6.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/949da17d-e975-4140-8f5a-8adb4d716750/ZK_icons_basic-white-07.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/dd4da4c3-e028-403d-ad83-005616d9b073/ZK_icons_basic-white-04.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/7f515de4-bef6-423f-aa9e-c651f9544c6d/ZK_icons_basic-white-03.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/77e3d5e4-95a8-48b5-b4fc-4b944e464461/ZK_icons_basic-white-05.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/2be2b65a-dae6-4f88-a3f2-ab35684ee6ee/ZK_icons_basic-white-02.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c82fab26-2b70-4091-9618-2627c17d199c/ZK_icons_basic-white-06.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/11e4e9b5-85b6-40fe-85e4-8e8204d1b953/ZK_icons_basic-blue-06.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4f298215-6f08-49a3-b123-812c356d7d2f/ZK_icons_basic-blue-07.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4f298215-6f08-49a3-b123-812c356d7d2f/ZK_icons_basic-blue-07.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/231e5cfa-56df-48de-833b-b5ef26aa7dbb/ZK_icons_basic-blue-05.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/6c8f76b0-ab2f-45ef-80e6-9f8e52520883/ZK_icons_basic-blue-01.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/2c5b8b38-6b89-4907-93dc-c1b5c7ba2ddc/ZK_icons_basic-blue-03.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f37f686f-61bd-449c-bb25-3344d6e6b5d4/ZK_icons_basic-blue-02.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4428d0ca-4ade-416a-8113-9bfcab09a5c2/ZK_icons_basic-black-05.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e69bab46-701d-4744-bbb7-a9b8ab11e9f9/ZK_icons_basic-black-04.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/cf751c49-82f8-4ac5-add3-7a12cac2e09f/ZK_icons_basic-black-02.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/69ba85e5-6cfb-439f-8777-7321d36767f6/ZK_icons_basic-black-07.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/8f0846eb-5847-434b-ac6b-dd12c242793b/ZK_icons_basic-black-03.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/8f0846eb-5847-434b-ac6b-dd12c242793b/ZK_icons_basic-black-03.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/efd66906-0353-4b0a-9749-f077f5a685cf/ZK_icons_basic-black-01.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/eb0b11cb-42f7-40e0-be88-b37811804612/ZK_icon_special-black_22.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/b5ca73e7-c583-4c99-9f3f-51b8694fa2e0/ZK_icon_special-black_45.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e3751ee9-0f75-42b0-bd6f-7cd2ac4f0856/ZK_icon_special-black_47.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/febe5d29-a3e4-495b-8e4b-ac277f87376c/ZK_icon_special-black_41.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/11c1a182-c7c8-4964-ac03-ac2f634dbda9/ZK_icon_special-black_38.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c0f17cdf-40c5-4254-92aa-bd210466f0c1/ZK_icon_special-black_48.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/ee421c04-a83c-4cf9-8a3d-1c3b5115fcc8/ZK_icon_special-black_42.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/70107dac-17b5-4747-8ea5-809284041961/ZK_icon_special-black_49.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/ee421c04-a83c-4cf9-8a3d-1c3b5115fcc8/ZK_icon_special-black_42.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f16812e7-b514-44a1-b318-42e41dd76e0a/ZK_icon_special-black_46.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/eb4ea163-72df-46eb-9a44-13067c5aec1e/ZK_icon_special-black_50.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/6823a926-eb3b-4a53-895f-8ccf9d10e776/ZK_icon_special-black_51.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/472412ca-4215-4ec7-8003-7ad06dec672f/ZK_icon_special-black_44.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e9b8bca0-d5c9-4415-9c08-1960191c50f6/ZK_icon_special-black_39.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/a72b3c40-1512-43cc-835c-d0cf54150156/ZK_icon_special-black_40.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/dd543d48-942c-4c43-8fe2-3528a16dc989/ZK_icon_special-black_33.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/95c54430-e1a7-4d3a-a67b-3430b248163b/ZK_icon_special-black_27.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/59eca8e7-ac42-413f-ae07-ec8ae555e179/ZK_icon_special-black_15.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/9bd8ae19-5413-42ff-9526-b7d663d33ea4/ZK_icon_special-black_31.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/98ddfdc2-0f53-4237-a1f1-48ea3457f35d/ZK_icon_special-black_30.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/686ffda5-fc08-4ee9-a38f-5ae62ecb151c/ZK_icon_special-black_12.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/ebea785d-fb80-49e7-9e04-a3c529b6fcaa/ZK_icon_special-black_35.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/42aced99-88d8-429e-aed0-82a5244fe038/ZK_icon_special-black_32.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/0b03f01d-b8c1-43e2-a642-fad492a2b1bb/ZK_icon_special-black_34.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e2cfe944-688d-4c83-af7e-af0965f21512/ZK_icon_special-black_37.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/9a7d1efc-dec7-42ad-b34d-f6f6b44ae411/ZK_icon_special-black_36.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/fc8b4777-9c75-432e-aa12-729e6487301d/ZK_icon_special-black_25.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/9df7aec5-6a78-4241-87e6-45cb5072bcb0/ZK_icon_special-black_20.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/0b8c4e5a-ae3a-4655-8cc3-956d468f5f5d/ZK_icon_special-black_29.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/389f6cb3-c9f2-4f98-bcde-59ea9755037b/ZK_icon_special-black_28.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/043913e1-887e-4109-9b79-44f963dba077/ZK_icon_special-black_23.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/719fac88-5f85-4b74-a029-38a6ceec4a69/ZK_icon_special-black_16.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/ada47eae-abf3-4df1-bb7e-c95ebb46c2c7/ZK_icon_special-black_7.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/07c9f938-4c80-4d0f-89d6-d00fca7755b4/ZK_icon_special-black_19.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c7062aca-043a-4a0e-a4b7-f16434868490/ZK_icon_special-black_26.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/0413b0e5-c666-41e2-9604-6fbf80f663bd/ZK_icon_special-black_21.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/428099b4-f5f4-4446-a9f3-8c78fd2a5416/ZK_icon_special-black_24.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/71bfd1ae-6a81-4c65-838f-e9ec6cea61be/ZK_icon_special-black_9.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/ad346357-b134-467d-bb2a-7cc687e69ce8/ZK_icon_special-black_8.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/269aaf04-3da3-44f0-ad21-78fefac5fe3b/ZK_icon_special-black_2.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c001badf-f174-49fa-8e0d-a15c1f276f0c/ZK_icon_special-black_18.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/cc8116b1-10ff-48d3-9d39-594892c0da2a/ZK_icon_special-black_1.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/93e35e42-9a16-40b9-92c4-36d0a8d38e7b/ZK_icon_special-black_17.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/9a26179f-3bba-4e9b-8cbe-3bafb0802356/ZK_icon_special-black_13.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/3917a945-8465-4fdf-99e6-0ece337bb9d5/ZK_icon_special-black_11.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d8696be7-15b5-432f-8d85-a9ff8a87bc44/ZK_icon_special-black_14.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/8127d05d-d52a-4100-ae51-8128bb0a0326/ZK_icon_special-black_10.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f49f6802-51f2-419c-baf8-e3fe1ff1e3b8/ZK_icon_special-black_6.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/75ec196f-6ce3-45ce-ace6-a69ba5330590/ZK_icon_special-black_4.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/02f1a22c-8574-4f63-a278-befbcdf0e458/ZK_icon_special-black_3.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/b544ac5e-5b4f-41bc-ab89-b59909d1bebe/ZK_icon_special-black_5.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/eebb42cb-fae4-4917-8839-fb5a359a1304/ZK_icon_special-blue_47.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/7bcc0397-5542-40be-97e7-0139e7c50182/ZK_icon_special-blue_51.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4b5757d4-98fb-4462-b0c5-06799553c4fa/ZK_icon_special-blue_49.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/3aea2358-ac47-48bb-ad49-78fe95e0b611/ZK_icon_special-blue_40.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/69819aab-1801-490b-9adc-042cdcaa52cb/ZK_icon_special-blue_43.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/db05301a-ccc4-4348-b1ad-c15fd5f22df6/ZK_icon_special-blue_45.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f22e8056-4f27-4e4c-b791-ae13b2bbb336/ZK_icon_special-blue_50.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/68f57331-9830-4436-b89f-7eaf4742d3cc/ZK_icon_special-blue_48.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/8a95fabf-058d-4462-b67a-dedff7e88052/ZK_icon_special-blue_46.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/b3db4839-7bc2-48a1-96e1-34a5b7b0110f/ZK_icon_special-blue_31.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/a43ca7e8-fa20-4f4a-8e88-24c705f17f7c/ZK_icon_special-blue_38.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/7b4bb66e-9656-4db7-9649-fe252ae6f158/ZK_icon_special-blue_35.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/3f9e42ee-89a6-4cb3-bf7b-91efddf24043/ZK_icon_special-blue_33.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/ba29c9a7-76e5-4b2e-a10c-0ed8b9178b80/ZK_icon_special-blue_41.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/7295b81f-865b-49bb-ab69-fa92871c1d18/ZK_icon_special-blue_32.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c057c551-63b1-4386-bc6b-4d9a76eeb23c/ZK_icon_special-blue_34.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c8f1dcd6-6b6e-4962-8755-f5f39261e18a/ZK_icon_special-blue_36.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d5599416-4386-47cf-8fc0-266909a58c31/ZK_icon_special-blue_42.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f5f8c0bf-7ba1-4321-9c29-ad50aa81a9ec/ZK_icon_special-blue_37.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/16c377e0-a5e8-4396-959f-4ab892bbbd22/ZK_icon_special-blue_39.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e825d751-47b7-4a34-b9d8-8a9d15da73d6/ZK_icon_special-blue_44.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/1ad21a5b-edd5-4599-b9d7-dda25173b629/ZK_icon_special-blue_30.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/5e4b665e-7672-4df7-bd74-88f81f31d2cd/ZK_icon_special-blue_17.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c47c5c0f-ed9f-490b-a9fd-c53beffa8b13/ZK_icon_special-blue_29.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/82dd2af9-c519-4107-b71a-ab4be3f86a1c/ZK_icon_special-blue_24.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/84683c38-f049-4ef0-b68c-5f9eba7c541e/ZK_icon_special-blue_20.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/6e61aaf8-c896-4237-a898-b6593f65e455/ZK_icon_special-blue_21.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/a1aada97-5fb7-4eb8-9be5-b3810617c2e6/ZK_icon_special-blue_26.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/939674f6-811a-4251-a991-ccf4aa6355be/ZK_icon_special-blue_23.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/bf2ab005-c661-4905-b17d-7945a6eed2ee/ZK_icon_special-blue_28.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/a03b923e-caf5-4767-b18a-6437a607e5c9/ZK_icon_special-blue_27.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/72142caf-c087-40fb-8dd1-3b17eabd64e1/ZK_icon_special-blue_25.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/90af4ada-0f76-44c2-b616-95c5675bfc4d/ZK_icon_special-blue_22.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c5d13239-6ef0-4ede-abea-92af747fcae8/ZK_icon_special-blue_9.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/bf0888ad-ffdd-4391-8311-8095cc705b21/ZK_icon_special-blue_12.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/5fe977e4-0d82-46fe-a939-e7c83e0d3716/ZK_icon_special-blue_8.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/53bc9f87-cd26-48b7-80e5-cc7a3e9898d1/ZK_icon_special-blue_19.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/ca388a94-a388-43b5-aaec-9aa8523ec938/ZK_icon_special-blue_16.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f9df039a-c1af-4541-98b1-eaf3c0eb2d84/ZK_icon_special-blue_7.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/df559e35-c978-4d8a-97ae-b4030ff78bc1/ZK_icon_special-blue_18.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4914e239-2f7f-46aa-aa83-1bc8e3379787/ZK_icon_special-blue_14.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4f9b0c91-31c6-4209-97af-9d56bade90b4/ZK_icon_special-blue_15.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f77425c9-9ed5-4498-945e-01aec4510e9a/ZK_icon_special-blue_11.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/0754a853-70d6-439d-b313-d3bb2412783c/ZK_icon_special-blue_13.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/70f0fb34-b86f-4704-81b2-1796fd59682d/ZK_icon_special-blue_4.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c3a7c46d-04b8-464f-b9da-22d8c07bce75/ZK_icon_special-blue_3.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/39353fc4-a254-4931-b16d-1e2a3258c694/ZK_icon_special-blue_6.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d81b96b3-3bee-4b82-96dd-95b087cfcd8f/ZK_icon_special-blue_1.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/70bcdac4-36e7-4358-970c-73925f61cf7d/ZK_icon_special-blue_2.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4aca36a9-bfed-431e-8b90-d2ecd88dde19/ZK_icon_special-blue_5.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/73018bdb-c298-4703-8709-53569b42eb90/ZK_icon_special-blue_10.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/997cbb9f-9c07-4365-8258-f19c73069617/ZK_icon_special-white_50.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c87739b4-dda9-4eb6-8e44-ae801045abcc/ZK_icon_special-white_37.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/472fd0f8-334f-4d21-8c57-8cab0f422e0a/ZK_icon_special-white_46.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/30d9020e-32ff-47ba-883b-1bf404eadf9a/ZK_icon_special-white_47.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/6480319f-5a1f-4011-8d5d-51a3b813a510/ZK_icon_special-white_13.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/1a6a1e86-c4ac-4871-b63e-e5f76941ef87/ZK_icon_special-white_21.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/2399cafa-bc52-48b5-ac88-9dc2f18b99c0/ZK_icon_special-white_41.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/fd3037b8-ca3c-4446-aadd-1630d3db3bd3/ZK_icon_special-white_33.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e676bfe2-b133-4874-be2d-1272b065e005/ZK_icon_special-white_25.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/808e0e75-070d-4417-a3e4-8695d28f6213/ZK_icon_special-white_48.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/a69d2802-bea5-4a26-9f6f-dea72bba8743/ZK_icon_special-white_51.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/5470c91d-fe1e-4356-b325-c99667df9be2/ZK_icon_special-white_49.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/0a0f20ad-1074-4a50-a646-08c41741ac05/ZK_icon_special-white_29.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/bf1a2772-121d-4761-8e4c-7f269bc6bf85/ZK_icon_special-white_42.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/1c508d51-edbb-4d92-bfb7-6deb88e76358/ZK_icon_special-white_32.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d2bab6c8-cbcc-4650-b1b9-d136ba4b7229/ZK_icon_special-white_39.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/978565a3-ce1f-4ec2-b2a0-e29ad73adefb/ZK_icon_special-white_43.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/b8c8ac33-e654-4b02-9a11-7157d65f89c4/ZK_icon_special-white_36.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/a6f80961-aff9-4e0d-afe6-0dcbe0da4de8/ZK_icon_special-white_9.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/5d610cb6-3a89-4c5b-8070-132c82ec8241/ZK_icon_special-white_44.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/9d7eaa7b-3c67-4ee5-b347-1b9d477b120e/ZK_icon_special-white_45.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/ea41bd03-1188-486c-a4a2-a818c121a09f/ZK_icon_special-white_38.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f6c3bc16-2566-4729-a9d0-746a0c302a77/ZK_icon_special-white_40.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/2be10135-5030-4b32-af71-e07533d95f35/ZK_icon_special-white_34.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/972ff966-ad78-4f88-b7ee-828329affd34/ZK_icon_special-white_35.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/41000f4a-37da-4b2a-8fbd-f886650ce8fc/ZK_icon_special-white_14.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c617fcab-d277-42c7-9e92-01eadf551d0b/ZK_icon_special-white_28.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/38315db9-c8e5-40f4-b858-4f6dbabc80c0/ZK_icon_special-white_27.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/dffbe36f-9caa-4d2c-a5c5-7f91c7790314/ZK_icon_special-white_15.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/2893306b-fdcc-467b-b3b4-6c88765e2046/ZK_icon_special-white_23.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/24a52979-84e9-4e86-a709-635e57ef21c2/ZK_icon_special-white_22.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/204ee704-a5c8-4ed0-ae93-a25369a6b0be/ZK_icon_special-white_31.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/cc6bed96-f673-4ad6-a242-41a99f72e8dd/ZK_icon_special-white_20.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d636ad9a-a7e3-4d13-a6fe-abcba7e80215/ZK_icon_special-white_26.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/87c1888b-04d5-428f-af9a-8b78d00f2e22/ZK_icon_special-white_30.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/b7b957eb-4c6b-4e13-99e9-771f818a7d3c/ZK_icon_special-white_18.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/65478c96-3ebd-4cb7-8ddd-59c44dc4d6ad/ZK_icon_special-white_11.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/16282fa1-590a-4dec-9659-b8865ee01cc2/ZK_icon_special-white_6.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/497bc1a4-1671-4eec-b8c9-c078cf48b544/ZK_icon_special-white_17.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e264cbb9-cd36-46d2-95ba-9c46e9de3db8/ZK_icon_special-white_16.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e248bf5f-bab7-46e1-9fdd-9dd097562f89/ZK_icon_special-white_19.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/9a778db4-888a-4937-969b-22d9b99f0577/ZK_icon_special-white_10.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/fc19d1de-05c7-4fa2-9b38-35d6e1e77e51/ZK_icon_special-white_24.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f4aba2c2-d19a-4e20-a925-8e943c78d93c/ZK_icon_special-white_12.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f43cda91-0bf5-43d1-ac2f-471642e451ec/ZK_icon_special-white_7.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/5f6f9ef1-241b-43d8-b367-41a5420efa2b/ZK_icon_special-white_4.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/917aa4a7-1150-46d9-b405-404e66e0483c/ZK_icon_special-white_3.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/086cb7b2-6f77-441b-9e07-48b4cf924f64/ZK_icon_special-white_2.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/8975809d-2194-4d8f-b63e-705909b80ba2/ZK_icon_special-white_1.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/43448694-a7f1-40f3-8e0f-c8e0bc486973/ZK_icon_special-white_5.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f2ed8e14-e897-4f1e-b204-5fd3b3e314a7/ZK_icon_special-white_8.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/b01e37d7-8ac1-49a4-b8d7-802d2fe59e95/ZK_illustrations_blue-15.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/5a7c9bbb-a13c-48e9-8ba1-86154f06c162/ZK_illustrations_blue-16.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/efe23b77-fe9f-46fb-9f5b-c2874577bfae/ZK_illustrations_blue-09.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/fafaf66f-f41a-4ee8-b8af-7b6246e43b39/ZK_illustrations_blue-14.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/bbe1c866-44ea-4ae8-9643-b169a74a2b08/ZK_illustrations_blue-13.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/20dbfa25-c397-4b9b-b19d-afa7f64a6166/ZK_illustrations_blue-10.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/0d8b1ae6-4820-4024-8595-5f80ef67f22c/ZK_illustrations_blue-07.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d12fc0e6-0432-441d-9c36-fecb26dc6358/ZK_illustrations_blue-11.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/1dd4d9e4-cdeb-4be5-aacc-0aff25125645/ZK_illustrations_blue-17.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/83e34e3d-8cae-4227-904b-81c7195cacd5/ZK_illustrations_blue-03.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/f1d2e292-6bc0-4b7a-ba01-01803a6a5268/ZK_illustrations_blue-01.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/73b2cf59-b16e-484b-a7de-d96ea8b506d5/ZK_illustrations_blue-02.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/234c7910-7359-40b6-9d54-33ddb19bde39/ZK_illustrations_blue-12.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/51827ade-826e-4b4c-b7d9-82e57a57da81/ZK_illustrations_blue-08.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/54ca87b2-dadb-4cc1-848d-516dead6730e/ZK_illustrations_blue-04.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c60a7931-db31-43bf-831f-470f11aeb00a/ZK_illustrations_blue-05.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/96222af2-96bd-479a-a079-bc11d76047fb/ZK_illustrations_blue-06.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/23c1eb86-f79f-4ac6-b816-e6f50199fc8a/ZK_illustrations_black-01.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/3caa5607-768e-45dc-ba0f-626f09d284cb/ZK_illustrations_black-04.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/8d550bc0-ae6a-4a23-a78c-c8d5364a7f20/ZK_illustrations_black-16.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/e29728e9-9403-49f3-bacb-3acdddd2bd79/ZK_illustrations_black-10.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/d55869a8-297c-42a5-87dc-ac258ccbee71/ZK_illustrations_black-14.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/892ccbc8-0fb7-42b8-a8a1-d14de581235e/ZK_illustrations_black-07.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/06c06879-91b9-457e-a27b-f3231866bddf/ZK_illustrations_black-15.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c359be08-b344-4b47-9808-21d72012fcd2/ZK_illustrations_black-11.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/b66efe7e-ed26-4b42-beba-b1869ed37601/ZK_illustrations_black-03.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/c25d979c-cc29-4784-8441-798314e860c3/ZK_illustrations_black-12.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/77ab9274-65b9-4dd3-8e3f-5e1113cfc129/ZK_illustrations_black-08.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/1c59b74f-fc61-4d98-98c4-c250295c29e9/ZK_illustrations_black-06.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/4a29ca90-bb95-4fcb-b8ea-9fbe12ab5fd2/ZK_illustrations_black-13.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/98720498-55a7-4583-b159-e45e7952c359/ZK_illustrations_black-09.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/08d0f240-625d-48ce-b825-382c4cc57c14/ZK_illustrations_black-17.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/5270a0be-ab20-484c-84c4-7ea44a4a3e9c/ZK_illustrations_black-02.png?content-type=image/png
https://images.squarespace-cdn.com/content/65c9e6da38efdb65f2b2d36b/339eb585-1efd-4235-b993-65cd0188d6f5/ZK_illustrations_black-05.png?content-type=image/png
  `;

  // Convert the raw string to an array
  const urls = rawUrls
    .trim()
    .split("\n")
    .map((url) => url.trim());

  const images = urls.map((url) => {
    const parts = url.split("/");
    const fileNameWithQuery = parts[parts.length - 2]; // Correct segment
    const fileName = fileNameWithQuery.split("?")[0]; // Remove query parameters

    const name = fileName
      .replace("ZK_", "")
      .replace(/_/g, " ")
      .replace(".png", "")
      .trim();

    const tags = [];
    if (fileName.toLowerCase().includes("black")) tags.push("black");
    if (fileName.toLowerCase().includes("blue")) tags.push("blue");
    if (fileName.toLowerCase().includes("white")) tags.push("white");
    if (fileName.toLowerCase().includes("button")) tags.push("button");
    if (fileName.toLowerCase().includes("icon")) tags.push("icon");
    if (fileName.toLowerCase().includes("illustrations"))
      tags.push("illustration");

    return { url, name, tags };
  });

  const [inputValue, setInputValue] = useState("");

  const drop = async (e) => {
    const { x, y, target } = e;

    if (target instanceof HTMLImageElement) {
      const image = await board.createImage({ x, y, url: target.src });
      await board.viewport.zoomTo(image);
    }
    console.log(images);
  };

  // Register the drop event handler once
  useEffect(() => {
    board.ui.on("drop", drop);
  }, []);

  return (
    <div className="main">
      <Input handleInputChange={(value) => setInputValue(value)} />
      {images
        .filter((o) => {
          return (
            o["name"].toLowerCase().includes(inputValue.toLowerCase()) ||
            o["tags"].some((value) => value.includes(inputValue.toLowerCase()))
          );
        })
        .map((image, index) => (
          <img
            src={image.url}
            draggable={false}
            className="miro-draggable draggable-item"
            key={index}
          />
        ))}
    </div>
  );
}

// Render App
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
