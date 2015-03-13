//
//  GXCustomExternalObjectsMapper.m
//  GXFlexibleClient
//
//  Copyright 2011 Artech. All rights reserved.
//

#import "GXCustomExternalObjectsMapper.h"

@implementation GXCustomExternalObjectsMapper

- (NSString *)externalObjectClassNameForObjectName:(NSString *)name {
    if ([name isEqualToString:@"ChangeServer"])
        return @"ChangeServerHandler";
    return nil;
}

@end
