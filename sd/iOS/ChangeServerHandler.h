#import <GXFlexibleClient/GXFlexibleClient.h>

@interface ChangeServerHandler : GXActionExternalObjectHandler

+ (BOOL)canHandleAction:(id <GXActionExternalObjectDescriptor>)actionExObjDesc;
- (void)actionExecuteWithContext:(id)contextEntityData delegate:(id)delegate;

@end